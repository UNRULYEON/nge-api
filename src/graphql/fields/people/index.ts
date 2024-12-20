import { GraphQLString, GraphQLList, type GraphQLFieldConfig } from "graphql";
import { repositories } from "@/repositories";
import { peopleGraphQLType } from "@/types/Person";

const allPeopleFields: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(peopleGraphQLType),
  description: "Returns details of all people",
  resolve: () => repositories.person.get.all(),
};

const personById: GraphQLFieldConfig<any, any, Partial<{ id: string }>> = {
  type: peopleGraphQLType,
  description: "Returns details of a person",
  args: {
    id: { type: GraphQLString },
  },
  resolve: (_, args) =>
    args.id ? repositories.person.get.byId({ id: args.id }) : null,
};

const person = {
  all: allPeopleFields,
  by: {
    id: personById,
  },
};

export { person };
