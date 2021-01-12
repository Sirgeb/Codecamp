require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";
import cors from 'cors';

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const corsOptions = {
    origin: process.env.PUBLIC_URL,
    credentials: true
  }

  app.use(cors(corsOptions));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });

  server.applyMiddleware({ app, path: "/api", cors: false });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}/api`);
};

mount(express());
