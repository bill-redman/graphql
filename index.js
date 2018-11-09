const { ApolloServer, gql } = require('apollo-server');

var loki = require('lokijs');
db = new loki('loki.json');

var mybooks = db.addCollection('mybooks');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Date {
    now: String
    hello: String
  }

  type Query {
    mybooks: [Book]
    date: [Date]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    mybooks: () => [mybooks],
    date: () => [{
      now:Date(),
      hello: "hello at "+Date()
    }]
  },
  Mutation: {
    addBook: (root, args) => {
        const items = {
            title: args.title,
            author: args.author,
        }
        mybooks.insert(items)
        return items
    }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });