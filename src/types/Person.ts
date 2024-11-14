import { GraphQLObjectType, GraphQLString } from "graphql";

export type Person = {
  id: string;
  name: string;
  imageUrl: string;
};

export const peopleGraphQLType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    imageUrl: {
      type: GraphQLString,
    },
  }),
});
