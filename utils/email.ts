import nodemailer from "nodemailer";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import env from "dotenv";
env.config();

const GOOGLE_REFRESH_TOKEN = process.env.REFRESH_TOKEN!;

const GOOGLE_SECRET = process.env.SECRET_GOOGLE!;

const GOOGLE_ID = process.env.G_ID!;

const GOOGLE_URL = process.env.G_URL!;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });

export const sendAccountMail = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kossyuzoigwe@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign(
      {
        id: user._id,
        userToken: user.token,
      },
      process.env.SECRET_KEY!
    );


    const readData = path.join(__dirname, "../views/accountOpening.ejs");

    const html = await ejs.renderFile(readData, {
      name: user.userName,
      token: user.token,
      email: user.email,
      url: `http://localhost:5173/api/${token}/verify-user`,
    });
    const mailer = {
      from: "Team Mace <kossyuzoigwe@gmail.com> ",
      to: user.email,
      subject: "Account Registration",
      html,
    };

    await transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error.message);
  }
};

