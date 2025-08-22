import { Request, Response } from "express";

export const init = (req: Request, res: Response) => {
    res.send("<h1>Hello World</h1>");
}