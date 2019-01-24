import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Request, Response } from 'express';
import { createModels } from "./models";
import { UserInstance } from "app/models/User";
import { CommentInstance } from "app/models/Comment";
import { PostInstance } from "app/models/Post";
import cors from 'cors';

const sequelizeConfg = require("./config/config.json");
const db = createModels(sequelizeConfg.local);
db.sequelize.sync();

const app: express.Application = express();

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.get("/users", (req: Request, res: Response) => {
    db.User.findAll()
        .then((users: UserInstance[]) => {
            const filteredUsers = users.map(user => user.name);
            return res.status(200).json({ users: filteredUsers })
        })
        .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.post("/users", (req: Request, res: Response) => {
    const { name } = req.body;
    console.log(name);
    db.User.create({ name })
        .then((user: UserInstance) => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/comments', (req: Request, res: Response) => {
    db.Comment.findAll()
      .then((comments: CommentInstance[]) => res.status(200).json({ comments }))
      .catch(err => res.status(500).json({ err: ['oops', err] }));
  });
  
app.get('/posts', (req: Request, res: Response) => {
db.Post.findAll()
    .then((posts: PostInstance[]) => res.status(200).json({ posts }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

const port: number = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});