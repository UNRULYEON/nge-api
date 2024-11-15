import { GraphQLString, type GraphQLFieldConfig } from "graphql";

const hello: GraphQLFieldConfig<any, any, Partial<{ id: string }>> = {
  type: GraphQLString,
  description: "Hello, world",
  resolve: () => "world",
};

export { hello };
