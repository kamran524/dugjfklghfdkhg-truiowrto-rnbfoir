import logger from "../log/winston";
import { Request } from "express";
import CustomerService from "./customer.service";
import TokenService from "./token.service";
import { ApiError } from "../errors/api.error";
import bcrypt from "bcrypt";
import CustomerRepository from "../repository/customer.repository";
import { MailService } from "./mail.service";

class AuthService {
  private readonly tokenService: TokenService;
  private readonly customerService: CustomerService;
  private readonly customerRepository: CustomerRepository;
  private readonly mailService: MailService;
  constructor() {
    this.tokenService = new TokenService();
    this.customerService = new CustomerService();
    this.customerRepository = new CustomerRepository();
    this.mailService = new MailService();
  }
  public async SignUp(request: Request) {
    logger.debug(`${AuthService.name}.SignUp -- start`);
    const { email } = request.body;
    request.body.verifyToken =
      await this.tokenService.generateVerifyToken(email);
    const result = await this.customerService.createCustomer(request);
    await this.mailService.sendMail(result.email,result.firstName,request.body.verifyToken);
    if (!result) {
      logger.warn(`${AuthService.name}.SignUp -- BadRequest`);
      throw ApiError.BadRequest();
    }
    return result;
  }

  public async VerifyMail(request: Request) {
    logger.debug(`${AuthService.name}.VerifyMail -- start`);
    const { verifyToken } = request.params;
    const customer = await this.customerRepository.findCustomerByUniqueVal({verifyToken});
    if(!customer){
        logger.warn(`${AuthService.name}.verifyMail -- BadRequest`);
        throw ApiError.BadRequest();
    }
    const isValid = await this.tokenService.validateVerifyToken(verifyToken);
    request.body.id = customer._id;
    if(!isValid){
        logger.warn(`${AuthService.name}.verifyMail -- ExpiredToken`);
        const ntoken = await this.tokenService.generateVerifyToken(customer.email);
        await this.mailService.sendMail(customer.email,customer.firstName,ntoken)
        this.customerRepository.updateCustomerById(request.body.id, {verifyToken:ntoken});
        throw ApiError.BadRequest();
    }
    const result = await this.customerRepository.updateCustomerById(request.body.id, {isEmailVerified:true});
    logger.debug(`${AuthService.name}.VerifyMail -- success`);
    return result;
  }
  public async LogIn(request: Request) {
    logger.debug(`${AuthService.name}.LogIn -- start`);
    const { email, password } = request.body;
    const customer = await this.customerRepository.findCustomerByUniqueVal({
      email,
    });
    if (!customer) {
      logger.warn(`${AuthService.name}.LogIn -- NotFound`);
      throw ApiError.NotFoundException();
    }
    const pass = await bcrypt.compare(password, customer.password);
    if (!pass) {
      logger.warn(`${AuthService.name}.LogIn -- Invalid Password`);
      throw ApiError.BadRequest();
    }
    if (!customer.status || !customer.isEmailVerified) {
      logger.warn(`${AuthService.name}.LogIn -- Invalid Account`);
      throw ApiError.BadRequest();
    }
    const tokens = await this.tokenService.generateTokens(customer._id);
    await this.tokenService.saveToken(customer._id, tokens.refreshToken);
    return tokens;
  }

  public async LogOut(request:Request){
    logger.debug(`${AuthService.name}.LogOut -- start`);
    const token = request.header('fex_access').split('Bearer ')[1];
    const rtoken = request.header('fex_refresh').split('Bearer ')[1];
    const result = await this.tokenService.removeToken(token,rtoken);
    return result;
    
  }
  public async refresh(refreshToken: string) {
    try {
      const userData: any = await this.tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        throw ApiError.UnauthorizedError();
      }
      const user = await this.customerRepository.findCustomerById(userData.payload);
      if (!user) {
        throw ApiError.BadRequest();
      }
      const tokens = await this.tokenService.generateTokens(user._id);
      return { ...tokens, user: user._id };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
