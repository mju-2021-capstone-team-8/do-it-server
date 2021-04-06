import { Request, Response } from "express";

export const info = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "API Test - Song Info",
  });
};

export const renderTempo = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "API Test - Render Tempo from music",
  });
};

