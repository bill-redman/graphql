import {MongoClient} from 'mongodb';
import { ApolloServer, gql } from 'apollo-server';

const URL = 'http://localhost';
const PORT = 8888;
const MONGO_URL = 'mongodb://localhost:27017/sbphysicians';
var db;

db = MongoClient.connect(MONGO_URL);

const Objects = db.collection("sbphysicians");

const typeDefs = gql`

    type Query {
        allObjects: [Object]
    }
  
    type Name {
        first: String
        last: String
    }

    type Titles {
        title: String
    }
`;

const resolvers = {
  Query: {
    allObjects: async () => {
        return (await Objects.find().limit(10).pretty());
      }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});