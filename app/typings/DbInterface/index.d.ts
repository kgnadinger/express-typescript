import * as Sequelize from "sequelize";
import { CommentAttributes, CommentInstance } from "app/models/Comment";
import { PostAttributes, PostInstance } from "app/models/Post";
import { UserAttributes, UserInstance } from "app/models/User";

export interface DbInterface {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    Comment: Sequelize.Model<CommentInstance, CommentAttributes>;
    Post: Sequelize.Model<PostInstance, PostAttributes>;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    [key: string]: any;
}