import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "app/typings/SequelizeAttributes";
import { UserAttributes, UserInstance } from '../User';
import { CommentAttributes, CommentInstance } from '../Comment';

export interface PostAttributes {
    id?: number;
    name: string;
    title: string;
    text: string;
    category: 'tech' | 'croissants' | 'techno';
    createdAt?: Date;
    updatedAt?: Date;

    comments?: CommentAttributes[] | CommentAttributes['id'][];
    author?: UserAttributes | UserAttributes['id'];
};

export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes {
    getComments: Sequelize.HasManyGetAssociationsMixin<CommentInstance>;
    setComments: Sequelize.HasManySetAssociationsMixin<CommentInstance, CommentInstance['id']>;
    addComments: Sequelize.HasManyAddAssociationsMixin<CommentInstance, CommentInstance['id']>;
    addComment: Sequelize.HasManyAddAssociationMixin<CommentInstance, CommentInstance['id']>;
    createComment: Sequelize.HasManyCreateAssociationMixin<CommentAttributes, CommentInstance>;
    removeComment: Sequelize.HasManyRemoveAssociationMixin<CommentInstance, CommentInstance['id']>;
    removeComments: Sequelize.HasManyRemoveAssociationsMixin<CommentInstance, CommentInstance['id']>;
    hasComment: Sequelize.HasManyHasAssociationMixin<CommentInstance, CommentInstance['id']>;
    hasComments: Sequelize.HasManyHasAssociationsMixin<CommentInstance, CommentInstance['id']>;
    countComments: Sequelize.HasManyCountAssociationsMixin;

    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
};

export const PostFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PostInstance, PostAttributes> => {
    const attributes: SequelizeAttributes<PostAttributes> = {
        name: {
          type: DataTypes.STRING
        },
        title: {
          type: DataTypes.STRING
        },
        text: {
          type: DataTypes.STRING(5000) // extra long length
        },
        category: {
          type: DataTypes.ENUM('tech', 'croissants', 'techno')
        }
    };

    const Post = sequelize.define<PostInstance, PostAttributes>('Post', attributes);

    Post.associate = models => {
        Post.hasMany(models.Comment);
        Post.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    };

    return Post;
}