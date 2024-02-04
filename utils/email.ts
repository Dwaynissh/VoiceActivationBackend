import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import env from "dotenv";
env.config();

const GOOGLE_ID =
  "446863175007-crj0qhi2ru7jbf975ng1b1vutpdorc0u.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH =
  "1//04jQ0P5pu_dILCgYIARAAGAQSNwF-L9IrJjH8M6DiPLyr2_DMKpOdx2HQzJEG5uo5yyl0WGTiqZ8NJfSTzVI1EmKWzPFcSo7mBtk";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const URL: string = `http://localhost:5173`;

export const sendEmail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "princechimelajohn@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const getFile = path.join(__dirname, "../views/index.ejs");

    const URL: string = process.env.APP_URL!;

    const data = {
      token: user.token,
      email: user.email,
      url: URL,
    };

    const html = await ejs.renderFile(getFile, { data });

    const mailer = {
      from: "Voice Alert🔥🔥 <dwaynissh@gmail.com>",
      to: user.email,
      subject: "Important Alert Message",
      html,
    };

    for (const email of user.email) {
      mailer.to = email;
      await transporter.sendMail(mailer);
      console.log("Sent to:", email);
    }
  } catch (error) {
    return error;
  }
};
