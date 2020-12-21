require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import schema from "./schema";
import logger from "morgan"; // 미들웨어
import mysql from "mysql";
import "./sequelize";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ schema });

const app = express(); //express 사용
app.use(logger("dev")); //실행로고 찍기
server.applyMiddleware({ app }); //아폴로서버위에 express 얹기

//mysql 연동
const storage = mysql.createConnection({
    host: "1.231.176.58",
    user: "bjwkor",
    password: "bjwkor",
    port: 3306,
    database: "capstone", //Mysql schema
    timezone: "+09:00", // 한국 시간
    dateStrings: "date", // 시간
});
//에러면 에러리턴
storage.connect((err) => {
    if (err) {
        return;
    }
    storage.end();
});

app.listen({ port: PORT }, () => console.log(`✅ Server ready at http://localhost:4000${server.graphqlPath}`));
