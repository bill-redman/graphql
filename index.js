const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const CustomType = new GraphQLObjectType({
  name: 'Custom',
  fields: {
    PersonalStatement: {
      type: GraphQLString,
      resolve: (parent) => parent['22817']
    },
    Titles: {
      type: GraphQLString,
      resolve: (parent) => parent['22884']
    }
  }
});

const typeDefs = gql`

  type DocInfo {
    npi: String
    locationName: String
    degrees: [String]
    officeName: String
    address: String
    city: String
    state: String
    zip: String
    phone: String
    certifications: [String]
    specialties: [String]
    conditionsTreated: [String]
    insuranceAccepted: [String]
    educationList: [Education]
    customFields: [Custom]
  }

  type Custom {
    PersonalStatement: String
    Titles: String
  }

  type Education {
    type: String
    institutionName: String
    yearCompleted: String
  }

  type DocLocation {
    officeName: String
    address: String
    city: String
    state: String
    zip: String
    phone: String
  }

  type Query {
    getdocinfo(arg2: String): [DocInfo]
  }
`;

const resolvers = {
  Query: {
    getdocinfo: (root, args) => {
      return fetch("https://api.yext.com/v2/accounts/1277495/locationsearch?api_key=672bc1867f6117b14d2b0184845c7ddc&v=20181220&filters=[{'npi': {'is': ["+args.arg2+"]}}]")
      //return fetch("https://api.yext.com/v2/accounts/1277495/entities/"+args.arg2+"?api_key=672bc1867f6117b14d2b0184845c7ddc&v=20181220")
      .then(response => response.json())
      .then(x => (x.response.locations));
      //.then(response => console.log(response.json()));
    },
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