'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import publicationRoutes from'../src/publications/publication-routes.js';
import commentRoutes from '../src/comments/comments-routes.js'; 
import categoryRoutes from '../src/category/category-routes.js';
import {createDefaultAdmin , createDefaultCategory} from "./data.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use("/publicationSystem/v1/auth", authRoutes);
    app.use("/publicationSystem/v1/users", userRoutes);
    app.use("/publicationSystem/v1/publications", publicationRoutes);
    app.use("/publicationSystem/v1/comments", commentRoutes);
    app.use("/publicationSystem/v1/categorys", categoryRoutes);
};


const ConnectDB = async () =>{
    try{
        await dbConnection()
        await createDefaultAdmin()
        await createDefaultCategory()
    }catch(err){
        console.log(`Database connecetion failed ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        ConnectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`server inti failed ${err}`)
    }
}