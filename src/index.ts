console.log("Wrapping up...");

import { ApolloServer, gql, IResolvers } from "apollo-server-express";
import express from "express";
import * as models from "./models";

const app = express();
const port = 4000;

const typeDefs = gql`
  type User {
    id: Int!
    userName: String!
    lineManager: User
  }

  type Query {
    getUsers: [User!]!
    getUser(id: Int!): User
    lineManager: User
  }

  type Mutation {
    createUser(userName: String!, lineManagerId: Int!): User!
  }
`;

const resolvers: IResolvers = {
  Query: {
    getUsers: (_root, _params, { models }) => models.User.findAll(),
    getUser: (_root, { id }, { models }) => models.User.findByPk(id),
  },
  User: {
    lineManager: (parent, params, { models }) =>
      models.User.findByPk(parent.lineManagerId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
