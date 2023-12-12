import { Application, NextFunction, Request, Response,json } from "express";
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import user from "./router/userRouter"
import owner from "./router/ownerRouter"
import store from "./router/storeRouter"
import product from "./router/productRouter"


export const mainApp = (app: Application) => {
    
    app.use(json())
    app.use(cors())
    
    app.use(morgan("dev"))
    app.use(helmet())

    app.use("/api", user)
    app.use("/api", owner)
    app.use("/api", store)
    app.use("/api", product);
    
    app.use("/", (req: Request, res: Response) => {
        try {
            return res.status(HTTP.OK).json({
                message: "Welcome Home"
            })
        } catch (error: any) {
            return res.status(HTTP.BAD).json({
                message: "Home Error",
                data: error.message
            })
        }
    })
    
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
        next(new mainError({
            name: "Route Error",
            message: `Incorrect url ${req.originalUrl} does not exist`,
            status: HTTP.BAD,
            success: false,
        })
        );
    });
    app.use(errorHandler)
};
