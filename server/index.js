import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    getBook: [Book]!
    getHello(id: Int): Int
  }
`;

const resolvers = {
  Query: {
    getBook: () => {
      return books;
    },
    getHello: (parent, args, context) => {
      const id = args.id;
      return id * 2;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`Server listening at ${url}`);
