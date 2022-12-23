import envConfig from "../config/env.config";
import { mailConfig } from "../config/mail.config";
import logger from "../log/winston";

export class MailService {
  public async sendMail(email:string, name:string, token:string){
    logger.debug(`${MailService.name}.sendMail -- start`);
      try {
        await mailConfig.sendMail({
            to:email,
            from: envConfig.SMTP_USER,
            subject: "Verification Token",
            text: `Hello ${name} here is your validation token\n${token}`
        })
    logger.debug(`${MailService.name}.sendMail -- success`);
        
    } catch (error) {
        throw error;
    }
  }
}
