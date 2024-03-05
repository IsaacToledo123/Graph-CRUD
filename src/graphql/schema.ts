import userController from "../controller/user.controller";
import videoController from "../controller/video.controller";
import commentController from "../controller/comment.controller";

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        videos: [Video]
    }
    type Video {
        id: ID!
        title: String!
        description: String!
        comments: [Comment]
    }
    type Comment {
        id: ID!
        body: String!
        authorId: User
    }    
    type Query {
        authUser: User
        users: [User]
        user(id: ID!): User
        videos: [Video]
        video(id: ID!): Video
        videoByUser(id: ID!): [Video]
        comments(videoId: ID!): [Comment]
    }
    input UserInput {
        name: String!
        email: String!
        password: String!
    }
    input VideoInput {
        title: String!
        description: String!
    }
    input CommentInput {
        body: String!
        authorId: ID!
    }
    input updatePasswordInput {
        email: String!
        oldPassword: String!
        newPassword: String!
    }
    type Mutation {
        createUser(input: UserInput!): User
        updateUser(input: updatePasswordInput!): User
        deleteUser(id: ID!): User
        createVideo(input: VideoInput!): Video
        uptadeVideo(id: ID!, input: VideoInput!): Video
        createComment(input: CommentInput!): Comment
        deleteComment(id: ID!): Comment
    }
`;

const resolvers = {
    Query: {
        // authUser(){
        //     // return userController.authUser();
        // },
        user(_: any, {id}: any){
            return userController.readById(id);
        },
        users(){
            return userController.readAll();
        }
        // users: userController.readAll,
        // user: userController.readById,
        // videos: videoController.readAll,
        // video: videoController.readById,
        // videoByUser: videoController.readByUser,
        // comments: commentController.readByVideo,
    },
    Mutation: {
        createUser(_: any, { input }: any) {
            return userController.create(input);
        },
        updateUser(_: any, { input }: any) {
            return userController.updateById(input);
        },
        deleteUser(_: any, { input }: any) {
            try{
                return userController.deleteById(input);
            }
            catch(err: any){
                console.log(err.message);
                return { message: err.message };
            }
        },
    }
};

export { typeDefs, resolvers };