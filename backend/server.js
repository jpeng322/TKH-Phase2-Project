import express from "express";
import { PrismaClient } from "@prisma/client";
import jwtStrategy from "./auth/index.js";
import passport from "passport";
import * as dotenv from 'dotenv';
import cors from "cors";

//routers
import authRouter from "./routes/auth.js";
import petRouter from "./routes/pet.js";
import userRouter from "./routes/user.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

jwtStrategy(passport)

app.use("/user", userRouter)

// app.use("/pet", passport.authenticate("jwt", { session: false }), petRouter)
app.use("/pet", petRouter)



app.use("/auth", authRouter)



// app.use("/upload", picsRouter)

// app.use("/upload", passport.authenticate("jwt", { session: false }), picsRouter)
// app.use("/upload", picsRouter)

app.listen(process.env.PORT, function () {
    console.log(`Server listening on ${process.env.PORT}`)
})