import jwt, { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import envConfig from "../config/env.config";
import { ApiError } from "../errors/api.error";
import logger from "../log/winston";
import { TokenModel } from "../models/token.model";
import { redis } from "../databases/redis-connect";
import CustomerRepository from "../repository/customer.repository";
class TokenService {
  private readonly customerRepo: CustomerRepository;
  constructor() {
    this.customerRepo = new CustomerRepository();
  }
  public async generateTokens(payload: JwtPayload) {
    logger.debug(`${TokenService.name}.generateTokens -- start`);
    if (!payload) {
      logger.warn(`${TokenService.name}.generateTokens -- NoContentException`);
      throw ApiError.NoContentException();
    }
    try {
      const accessToken = jwt.sign({ payload }, envConfig.JWT_ACCESS, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ payload }, envConfig.JWT_REFRESH, {
        expiresIn: "1h",
      });
      logger.debug(`${TokenService.name}.generateTokens -- success`);
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
  public async saveToken(userId: Schema.Types.ObjectId, rtoken: string) {
    logger.debug(`${TokenService.name}.saveToken -- start`);
    if (!userId || !rtoken) {
      logger.warn(`${TokenService.name}.saveToken -- NoContentException`);
      throw ApiError.NoContentException();
    }
    try {
      const tokenData = await TokenModel.findOne({ customerID: userId });
      console.log(tokenData);
      if (tokenData) {
        tokenData.token = rtoken;
        return tokenData.save();
      }
      const token = await TokenModel.create({
        customerID: userId,
        token: rtoken,
      });
      logger.debug(`${TokenService.name}.saveToken -- success`);
      return token;
    } catch (error) {
      throw error;
    }
  }
  public async generateVerifyToken(payload: JwtPayload) {
    logger.debug(`${TokenService.name}.generateVerifyToken -- start`);
    if (!payload) {
      logger.warn(
        `${TokenService.name}.generateVerifyToken -- NoContentException`
      );
      throw ApiError.NoContentException();
    }
    try {
      const token = jwt.sign({ payload }, envConfig.JWT_VALIDATE, {
        expiresIn: "1h",
      });
      logger.debug(`${TokenService.name}.generateVerifyToken -- success`);
      return token;
    } catch (error) {
      throw error;
    }
  }
  public async validateAccessToken(token: string) {
    logger.debug(`${TokenService.name}.validateAccessToken -- start`);
    if (!token) {
      logger.warn(
        `${TokenService.name}.validateAccessToken -- NoContentException`
      );
      throw ApiError.NoContentException();
    }
    try {
      const validated = await jwt.verify(token, envConfig.JWT_ACCESS);
      if (!validated) {
        logger.warn(`${TokenService.name}.validateAccessToken -- BadRequest`);
        throw ApiError.BadRequest();
      }
      const result = await this.customerRepo.findCustomerById(
        validated.payload
      );
      if (!result) {
        logger.warn(`${TokenService.name}.validateAccessToken -- BadRequest`);
        throw ApiError.BadRequest();
      }
      logger.debug(`${TokenService.name}.validateAccessToken -- success`);
      return validated;
    } catch (error) {
      throw error;
    }
  }
  public async validateVerifyToken(token: string) {
    logger.debug(`${TokenService.name}.validateVerifyToken -- start`);
    if (!token) {
      logger.warn(
        `${TokenService.name}.validateVerifyToken -- NoContentException`
      );
      throw ApiError.NoContentException();
    }
    try {
      const user = await jwt.verify(token, envConfig.JWT_VALIDATE);
      logger.debug(`${TokenService.name}.validateVerifyToken -- success`);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async validateRefreshToken(token: string) {
    logger.debug(`${TokenService.name}.validateRefreshToken -- start`);
    if (!token) {
      logger.warn(
        `${TokenService.name}.validateRefreshToken -- NoContentException`
      );
      throw ApiError.NoContentException();
    }
    try {
      const result = await TokenModel.find({ token });
      if (!result.length) {
        throw ApiError.UnauthorizedError();
      }

      const user = jwt.verify(token, envConfig.JWT_REFRESH);
      logger.debug(`${TokenService.name}.validateRefreshToken -- success`);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async removeToken(token: string, rtoken: string) {
    logger.debug(`${TokenService.name}.removeToken -- start`);
    if (!token) {
      logger.warn(`${TokenService.name}.removeToken -- NoContentException`);
      throw ApiError.NoContentException();
    }
    try {
      const deleted = await TokenModel.deleteOne({ token: rtoken });
      redis.setex(token, 365 * 24 * 60 * 60, "invalid", (err) => {
        console.log(err);
      });
      redis.setex(rtoken, 365 * 24 * 60 * 60, "invalid", (err) => {
        console.log(err);
      });
      logger.debug(`${TokenService.name}.removeToken -- success`);
      return deleted;
    } catch (error) {
      throw error;
    }
  }
  public async blacklistCheck(token: string) {
    logger.debug(`${TokenService.name}.blacklistCheck -- start`);
    const result = await redis.get(token);
    if (result || result == "invalid") {
      logger.warn(`${TokenService.name}.blacklistCheck -- Blacklisted Token`);
      return false;
    }
    logger.debug(`${TokenService.name}.blacklistCheck -- success`);
    return true;
  }
}

export default TokenService;
