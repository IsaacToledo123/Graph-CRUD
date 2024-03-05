import userController from "../controller/user";
import WebHook from "../models/webhook";
import videoController from "../controller/video";
import commentController from "../controller/comment";

const typeDefs = `

type WebHookResponse {

    id : ID
    url : String
    event : String
    user : String
  }
  type WebHook {

    id : ID!
    url : String
    event : String
    userId : String
  }
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
        webhookUrlById(token: String!, webHookId : String!): WebHookResponse
        webhookUrls(token : String!, first : Int, after : Int): [WebHook]
        webhookUrlsByIdUser(token : String!, userId: String, first : Int, after: Int): [WebHook]
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
        user(_: any, { id }: any) {
            return userController.readById(id);
        },
        users() {
            return userController.readAll();
        },
        // users: userController.readAll,
        // user: userController.readById,
        // videos: videoController.readAll,
        // video: videoController.readById,
        // videoByUser: videoController.readByUser,
        // comments: commentController.readByVideo,
        webhookUrlById: async (__: void, args: any) => {
            try {
                const { webHookId } = args;

                const webhook = await WebHook.findById(webHookId);
                if (!webhook) return null;

                const { id, url, event, userId } = webhook;

                // Aquí podrías agregar la lógica para obtener el nombre de usuario del userId si lo necesitas

                return { id, url, event, userId };
            } catch (error) {
                console.error("Ha ocurrido un error:", error);
                return null;
            }
        },

        webhookUrls: async (__: void, args: any) => {
            try {
                const { first, after } = args;

                const endpoints = await WebHook.find().skip(after ? after : 0).limit(first);
                return endpoints;
            } catch (error) {
                console.error("Ha ocurrido un error:", error);
                return null;
            }
        },

        webhookUrlsByIdUser: async (__: void, args: any) => {
            try {
                const { userId, first, after } = args;

                const webhooks = await WebHook.find({ userId }).skip(after ? after : 0).limit(first);
                return webhooks;
            } catch (error) {
                console.error("Ha ocurrido un error:", error);
                return null;
            }
        }
    }

},
    Mutation: {
        createUser(_: any, { input }: any) {
            return userController.create(input);
        },
updateUser(_: any, { input }: any) {
    return userController.updateById(input);
},
deleteUser(_: any, { input }: any) {
    try {
        return userController.deleteById(input);
    }
    catch (err: any) {
        console.log(err.message);
        return { message: err.message };
    }
},
    }
};

export { typeDefs, resolvers };