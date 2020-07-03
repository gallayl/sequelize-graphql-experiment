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
    firstName: String
    lastName: String
    lineManager: User
  }

  type Brand {
    id: Int!
    name: String!
    createdBy: User
    modifiedBy: User
    products: [Product!]!
  }

  type Product {
    id: Int!
    name: String!
    createdBy: User
    modifiedBy: User
    brand: Brand!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: Int!): User
    getProducts: [Product!]!
    getBrands: [Brand!]!
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
    getBrands: (_root, _params, { models }) => models.Brand.findAll(),
  },
  User: {
    lineManager: (parent, _params, { models }) =>
      models.User.findByPk(parent.lineManagerId),
  },
  Brand: {
    products: (parent, _params, { models }) =>
      models.Product.findAll({ where: { brandId: parent.id } }),
    createdBy: (parent, _params, { models }) =>
      models.User.findByPk(parent.createdById),
    modifiedBy: (parent, _params, { models }) =>
      models.User.findByPk(parent.modifiedById),
  },
  Product: {
    brand: (parent, _params, { models }) =>
      models.Brand.findByPk(parent.brandId),
    createdBy: (parent, _params, { models }) =>
      models.User.findByPk(parent.createdById),
    modifiedBy: (parent, _params, { models }) =>
      models.User.findByPk(parent.modifiedById),
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
