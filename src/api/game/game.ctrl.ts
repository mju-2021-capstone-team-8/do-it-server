import { Request, Response } from "express";

export const info = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Song Info Test",
  });
};

