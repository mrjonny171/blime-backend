import express, { json } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from "cors";
import logger from "morgan";
import steamRouter from './routes/authSteam';
import authRouter from './routes/authPages';
import steam from './routes/steam';



const app = express();

passport.initialize()

if (["development", "production"].includes(process.env.NODE_ENV)) {
    app.use(logger("dev"));
}

app.use(json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(session({
    secret: 'SECRET_KEY',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter)
app.use("/", steamRouter)
app.use("/", steam)



export default app;

