import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { hello, person } from "../fields";

const rootType = new GraphQLObjectType({
  name: "Root",
  fields: () => ({
    hello: hello,
    allPeople: person.all,
    personById: person.by.id,
  }),
});

const schema = new GraphQLSchema({
  query: rootType,
});

export { schema };
