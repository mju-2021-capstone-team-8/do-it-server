import fs from "fs";
import path from "path";

import { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";

type UploadedFile = fileUpload.UploadedFile;

const audioDir = path.resolve(__dirname, "..", "..", "audios");

const isSingleFile = (file: UploadedFile | UploadedFile[]): file is UploadedFile => {
  return typeof file === "object" && (file as UploadedFile).name !== undefined;
}

const isFileArray = (file: UploadedFile | UploadedFile[]): file is UploadedFile[] => {
  return Array.isArray(file);
}

const fileUploader = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.files === "object") {
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir);
    }

    const { musicFile } = req.files;

    if (isSingleFile(musicFile)) {
      const musicFileField = musicFile as UploadedFile;
      req.tmpAudioPath = `${audioDir}/1/${musicFileField.name}`;
      req.tmpOutputJsonPath = `${req.tmpAudioPath}.json`;

      musicFileField.mv(req.tmpAudioPath, (err: Error) => {
        if (err) {
          return res.status(500).json({
            msg: "File upload failed",
          });
        }

        next();
      });
    }

    if (isFileArray(musicFile)) {
      const musicFileField = musicFile as UploadedFile[];
      req.tmpAudioPath = `${audioDir}/1/${musicFile[0].name}`;
      req.tmpOutputJsonPath = `${req.tmpAudioPath}.json`;

      musicFileField[0].mv(req.tmpAudioPath, (err: Error) => {
        if (err) {
          return res.status(500).json({
            msg: "File upload failed",
          });
        }
        
        next();
      });
    }
  } else {
    return res.status(500).send({
      msg: "File upload failed",
    });
  }
};

export default fileUploader;

