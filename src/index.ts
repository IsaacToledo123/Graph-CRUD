import "dotenv/config"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs, resolvers } from "./graphql/schema";
import connectToMongoDB from "./config/database/connection";


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