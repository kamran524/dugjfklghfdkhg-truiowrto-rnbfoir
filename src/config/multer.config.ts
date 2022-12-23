import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { FileFormat } from "../enum/storage/file.enum";
import logger from "../log/winston";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export class Multer {
  constructor() {}

  public fileLimits(): multer.Options["limits"] {
    return { fileSize: 5 * 1024 * 1024 };
  }

  public fileFilter = () => {
    return (
      _request: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ): void => {
      if (Object.values(FileFormat).includes(file.mimetype as FileFormat)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  };

  public fileStorage = () => {
    return multer.diskStorage({
      destination: (
        _request: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
      ): void => {
        const filePath = "public";
        fs.mkdirSync(filePath, { recursive: true });
        cb(null, filePath);
      },
      filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
      ): void => {
        const uid = uuidv4();
        cb(null, uid + "." + file.originalname.split(".")[1]);
      },
    });
  };

  public upload(): multer.Multer {
    return multer({
      storage: this.fileStorage(),
      fileFilter: this.fileFilter(),
      limits: this.fileLimits(),
    });
  }

  public async removeFile(file: Express.Multer.File) {
    try {
      let img: Express.Multer.File | string;
      if (file.filename) img = `public/${file.filename}`;
      else img = `public/${file}`;
      fs.unlink(img, (err) => {
        if (err) {
          logger.error("Wrong image path");
          throw err;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
