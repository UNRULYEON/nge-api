import { GraphQLString, type GraphQLFieldConfig } from "graphql";

const hello: GraphQLFieldConfig<any, any, Partial<{ id: string }>> = {
  type: GraphQLString,
  resolve: () => "world",
};

export { hello };
