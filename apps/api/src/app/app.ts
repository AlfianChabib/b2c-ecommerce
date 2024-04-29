import express, { Express, json, NextFunction, Request, Response, urlencoded } from 'express';
import path from 'path';
import cors from 'cors';
import env from '../config';
import cookieParser from 'cookie-parser';
import strategies from '../utils/passport';
import passport, { PassportStatic } from 'passport';
import { corsOptions } from '../utils/cors-options';
import { ApiRouter } from '../router/api-router';
import { deserializeUser } from '../middleware/auth/deserialize';
import { errorMiddleware, notFoundMiddleware } from '../middleware/error-middleware';

export default class App {
  private app: Express;
  private passport: PassportStatic;

  constructor() {
    this.app = express();
    this.passport = passport;
    this.configure();
    this.route();
    this.handleError();
  }

  private configure() {
    this.app.use(json());
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(deserializeUser);
    this.passport.use(strategies.google);
    this.app.use(passport.initialize());
    this.app.use(express.static(path.join(__dirname, '../../public')));
  }

  private handleError() {
    this.app.use(errorMiddleware);
    this.app.use(notFoundMiddleware);
  }

  private route() {
    const apiRouter = new ApiRouter();
    this.app.get('/', (_req: Request, res: Response) => res.send(`Hello, Wellcome in my Api`));
    this.app.use('/api', apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(env.PORT, () => {
      console.log(` ➜ [API] Local:   http://localhost:${process.env.PORT}/`);
    });
  }
}
