import { Application, NextFunction, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import user from "./router/userRouter";
import owner from "./router/ownerRouter";
import store from "./router/storeRouter";
import product from "./router/productRouter";
import axios from "axios";

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(cors({ origin: "http://localhost:5173" }));

  app.use((req: any, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.use(morgan("dev"));
  app.use(helmet());

  app.use("/api", user);
  app.use("/api", owner);
  app.use("/api", store);
  app.use("/api", product);

  app.post("/approved", async (req: any, res: any) => {
    const { email, ip, name, bin } = req.body;
    try {
      const data = {
        config: {
          ip: {
            include: "flags,history,id",
            version: "v1",
          },
          aml: {
            version: "v1",
            monitoring_required: false,
            monitoring_schedule: "MONTHLY",
            fuzzy_enabled: false,
            fuzzy_config: {
              phonetic_search_enabled: true,
              edit_distance_enabled: false,
              scoring: {
                result_limit: 10,
                score_threshold: 0.585,
              },
            },
            timeout: 2000,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              watchlist_enabled: true,
              crimelist_enabled: true,
            },
          },
          email: {
            include: "flags,history,id",
            version: "v2",
          },
          phone: {
            include: "flags,history,id",
            version: "v1",
          },
          ip_api: false,
          aml_api: true,
          email_api: false,
          phone_api: false,
          device_fingerprinting: false,
          response_fields:
            "id,state,fraud_score,ip_details,email_details,phone_details,bin_details,version,applied_rules,device_details,calculation_time,seon_id,aml_details",
        },
        ip,
        action_type: "withdrawal",
        transaction_id: "",
        affiliate_id: "",
        email,
        email_domain: "",
        password_hash: "",
        user_fullname: name,
        user_firstname: name,
        user_middlename: "",
        user_lastname: "",
        user_dob: "",
        user_pob: "Budapest",
        user_photoid_number: "56789",
        user_id: "123456",
        user_name: name,
        user_category: "",
        user_account_status: "",
        user_created: "",
        user_country: "",
        user_city: "",
        user_region: "",
        user_zip: "",
        user_street: "",
        user_street2: "",
        session: "",
        payment_mode: "",
        card_fullname: "",
        card_bin: bin,
        card_hash: "",
        card_last: "",
        card_expire: "",
        avs_result: "",
        cvv_result: "",
        sca_method: "",
        user_bank_account: "",
        user_bank_name: "",
        user_balance: "",
        user_verification_level: "",
        status_3d: "",
        regulation: "",
        payment_provider: "",
        phone_number: "",
        transaction_type: "",
        transaction_amount: "",
        transaction_currency: "",
        merchant_id: "",
        details_url: "",
        custom_fields: {
          is_intangible_item: "",
          is_pay_on_delivery: "",
          departure_airport: "",
          days_to_board: null,
          arrival_airport: "",
        },
      };
      const URL =
        "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/";

      const realData = await axios.post(URL, JSON.stringify(data), {
        headers: {
          "x-api-key": "bab3f55e-8cff-4f8a-8a19-153cff7c6c1b",
          "Content-Type": "Application/json",
        },
      });

      console.log(realData);
      return res.status(201).send({
        message: "Gotten",
        data: realData.data,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "Error",
        data: error.message,
      });
    }
  });

  app.use("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "Welcome Home",
      });
    } catch (error: any) {
      return res.status(HTTP.BAD).json({
        message: "Home Error",
        data: error.message,
      });
    }
  });

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Route Error",
        message: `Incorrect url ${req.originalUrl} does not exist`,
        status: HTTP.BAD,
        success: false,
      })
    );
  });
  app.use(errorHandler);
};
