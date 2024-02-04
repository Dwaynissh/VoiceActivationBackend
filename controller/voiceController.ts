import { Request, Response } from "express";
import { Http, voiceStatus } from "../utils/enums";
import voiceModel from "../model/voiceModel";
import { sendEmail } from "../utils/email";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const avatar = name.slice(0, 2).toUpperCase();

    const voice = await voiceModel.create({
      name,
      avatar,
      status: voiceStatus.NotAlerted,
    });

    sendEmail(voice);
    console.log("reading this line");

    return res.status(Http.Created).json({
      message: "user created successfully",
      data: voice,
    });
  } catch (error: any) {
    return res.status(Http.Bad).json({
      message: "Error Creating User" + error?.message,
    });
  }
};

export const sendAlertMessage = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const voice = await voiceModel.create({
      status: voiceStatus.Alerted,
      verify: true,
    });

    sendEmail(voice);
    console.log("reading this line");

    return res.status(Http.Created).json({
      message: "Security Message Sent Successfully",
      status: voiceStatus.Alerted,
      data: voice,
    });
  } catch (error: any) {
    return res.status(Http.Bad).json({
      message: "Error Sending Alert Message" + error?.message,
    });
  }
};
