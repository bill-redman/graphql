const { ApolloServer, gql } = require('apollo-server');

const loki = require('lokijs');

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


const db = new loki('books.json',{'autosave':true,'autoload':true,'serializationMethod':'pretty'});

var mybooks = db.addCollection("books");

if(mybooks.count() == 0 && mybooks.insert(books)) {
  console.log("Added books")
}


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
    books: [Book]
    date: Date
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return (mybooks.find({}));
    },
    date: () => [{
      now:Date(),
      hello: "hello at "+Date()
    }]
  },
  Mutation: {
    addBook: (root, args) => {
        const items = {
            'title': args.title,
            'author': args.author,
        };
        mybooks.insert(items);
        db.save();
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