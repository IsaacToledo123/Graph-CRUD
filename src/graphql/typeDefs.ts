export const typeDefs = `
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    channel: Channel!
  }
  type Channel {
    id: ID!
    name: String!
    subscribers: [User]!
    videos: [Video]!
  }
  type Video {
    id: ID!
    title: String!
    description: String!
    likes: [User]!
    dislikes: [User]!
  }
  type Query {
    users: [User]!
    user(id: ID!): User!
    channels: [Channel]!
    channel(id: ID!): Channel!
    videos: [Video]!
    video(id: ID!): Video!
  }
  input UserInput {
    email: String!
    password: String!
    name: String!
  }
  input ChannelInput {
    name: String!
  }
  input VideoInput {
    title: String!
    description: String!
  }
input updateUsuario{
  id:ID
  name:String
  password:String
  email:String
}
  type Mutation {
    createUser(input: UserInput!): User!
    createChannel(input: ChannelInput!): Channel!
    createVideo(input: VideoInput!): Video!
    deleteChannel(id: ID!): String!
    deleteVideo(id: ID!): String!
    deleteUser(id: ID!): String!
    updateUser(input: updateUsuario): String!
  }
`;