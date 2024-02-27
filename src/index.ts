import "dotenv/config"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { title } from "process";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import connectToMongoDB from "./connection";


connectToMongoDB();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })
    console.log(`servidor corriendo en ${url}`);

})();

console.log("OK!")