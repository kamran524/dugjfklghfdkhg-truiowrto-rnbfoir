import nodemailer from "nodemailer";
import envConfig from "./env.config";

export const mailConfig = nodemailer.createTransport({
  host: envConfig.SMTP_HOST,
  port: envConfig.SMTP_PORT as number,
  secure: (envConfig.SMTP_PORT as number) === 465,
  auth: {
    user: envConfig.SMTP_USER,
    pass: envConfig.SMTP_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
