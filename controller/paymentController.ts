import { Request, Response } from 'express';
import { HTTP } from './../error/mainError';
import ownerModel from '../model/ownerModel';
import https from "https"

export const payment = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const { amount } = req.body;

    const getUser = await ownerModel.findById(userID)

    const params = JSON.stringify({
      email: getUser?.email,
      amount: amount * 100,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https.request(options, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.OK).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    ask.write(params);
    ask.end();
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message: "Error making Payment",
    });
  }
};
