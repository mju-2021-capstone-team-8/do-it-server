import { Request, Response } from "express";

export const info = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "User Info Test",
  });
};

export const register = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "User Registration Test",
  });
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Login Test",
  });
};

export const loginOAuth = (req: Request, res: Response) => {
  res.status(200).send({
    msg: "OAuth Test",
  });
};

export const edit = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Edit Test",
  });
};

export const unregister = (req: Request, res: Response) => {
  res.status(200).json({
    msg: "User Unregistration Test",
  });
};

