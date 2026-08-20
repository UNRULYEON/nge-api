import {
  completable,
  McpServer,
  ResourceNotFoundError,
  ResourceTemplate,
} from "@modelcontextprotocol/server";
import { z } from "zod";

import { repositories } from "@/repository";

import { jsonResource, jsonResult, missingResult } from "./mcp.results";
import { episodeSchema, idInput, movieSchema, showSchema, studioSchema } from "./mcp.schemas";

const readOnly = {
  readOnlyHint: true,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const completeIds = (ids: () => string[]) => (value: string) =>
  ids().filter((id) => id.startsWith(value));

const registerTools = (server: McpServer) => {
  server.registerTool(
    "list-studios",
    {
      title: "List studios",
      description: "List every studio in the Neon Genesis Evangelion catalog.",
      annotations: readOnly,
      outputSchema: z.object({ studios: z.array(studioSchema) }),
    },
    () => jsonResult({ studios: repositories.studios.all() }),
  );

  server.registerTool(
    "get-studio",
    {
      title: "Get studio",
      description: "Get a studio by UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ studio: studioSchema }),
    },
    ({ id }) => {
      const studio = repositories.studios.byId({ id });
      if (studio == null) return missingResult("studio", id);
      return jsonResult({ studio });
    },
  );

  server.registerTool(
    "list-studio-shows",
    {
      title: "List studio shows",
      description: "List shows produced by a studio UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ shows: z.array(showSchema) }),
    },
    ({ id }) => {
      const studio = repositories.studios.byId({ id });
      if (studio == null) return missingResult("studio", id);
      return jsonResult({ shows: repositories.shows.byStudioId({ studio_id: studio.id }) });
    },
  );

  server.registerTool(
    "list-studio-movies",
    {
      title: "List studio movies",
      description: "List movies produced by a studio UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ movies: z.array(movieSchema) }),
    },
    ({ id }) => {
      const studio = repositories.studios.byId({ id });
      if (studio == null) return missingResult("studio", id);
      return jsonResult({ movies: repositories.movies.byStudioId({ studio_id: studio.id }) });
    },
  );

  server.registerTool(
    "list-shows",
    {
      title: "List shows",
      description: "List every show in the catalog.",
      annotations: readOnly,
      outputSchema: z.object({ shows: z.array(showSchema) }),
    },
    () => jsonResult({ shows: repositories.shows.all() }),
  );

  server.registerTool(
    "get-show",
    {
      title: "Get show",
      description: "Get a show by UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ show: showSchema }),
    },
    ({ id }) => {
      const show = repositories.shows.byId({ id });
      if (show == null) return missingResult("show", id);
      return jsonResult({ show });
    },
  );

  server.registerTool(
    "list-show-episodes",
    {
      title: "List show episodes",
      description: "List episodes belonging to a show UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ episodes: z.array(episodeSchema) }),
    },
    ({ id }) => {
      const show = repositories.shows.byId({ id });
      if (show == null) return missingResult("show", id);
      return jsonResult({ episodes: repositories.episodes.byShowId({ show_id: show.id }) });
    },
  );

  server.registerTool(
    "list-episodes",
    {
      title: "List episodes",
      description: "List every episode in the catalog.",
      annotations: readOnly,
      outputSchema: z.object({ episodes: z.array(episodeSchema) }),
    },
    () => jsonResult({ episodes: repositories.episodes.all() }),
  );

  server.registerTool(
    "get-episode",
    {
      title: "Get episode",
      description: "Get an episode by UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ episode: episodeSchema }),
    },
    ({ id }) => {
      const episode = repositories.episodes.byId({ id });
      if (episode == null) return missingResult("episode", id);
      return jsonResult({ episode });
    },
  );

  server.registerTool(
    "list-movies",
    {
      title: "List movies",
      description: "List every movie in the catalog.",
      annotations: readOnly,
      outputSchema: z.object({ movies: z.array(movieSchema) }),
    },
    () => jsonResult({ movies: repositories.movies.all() }),
  );

  server.registerTool(
    "get-movie",
    {
      title: "Get movie",
      description: "Get a movie by UUID.",
      annotations: readOnly,
      inputSchema: idInput,
      outputSchema: z.object({ movie: movieSchema }),
    },
    ({ id }) => {
      const movie = repositories.movies.byId({ id });
      if (movie == null) return missingResult("movie", id);
      return jsonResult({ movie });
    },
  );
};

const registerResources = (server: McpServer) => {
  server.registerResource(
    "studios",
    "nge://studios",
    {
      title: "Studios",
      description: "Every studio in the catalog.",
      mimeType: "application/json",
    },
    async (uri) => jsonResource(uri, repositories.studios.all()),
  );

  server.registerResource(
    "studio",
    new ResourceTemplate("nge://studios/{id}", {
      list: async () => ({
        resources: repositories.studios.all().map((studio) => ({
          uri: `nge://studios/${studio.id}`,
          name: studio.name,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.studios.all().map((studio) => studio.id)),
      },
    }),
    {
      title: "Studio",
      description: "A studio by UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const studio = repositories.studios.byId({ id: String(id) });
      if (studio == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, studio);
    },
  );

  server.registerResource(
    "studio-shows",
    new ResourceTemplate("nge://studios/{id}/shows", {
      list: async () => ({
        resources: repositories.studios.all().map((studio) => ({
          uri: `nge://studios/${studio.id}/shows`,
          name: `${studio.name} shows`,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.studios.all().map((studio) => studio.id)),
      },
    }),
    {
      title: "Studio shows",
      description: "Shows produced by a studio UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const studio = repositories.studios.byId({ id: String(id) });
      if (studio == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, repositories.shows.byStudioId({ studio_id: studio.id }));
    },
  );

  server.registerResource(
    "studio-movies",
    new ResourceTemplate("nge://studios/{id}/movies", {
      list: async () => ({
        resources: repositories.studios.all().map((studio) => ({
          uri: `nge://studios/${studio.id}/movies`,
          name: `${studio.name} movies`,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.studios.all().map((studio) => studio.id)),
      },
    }),
    {
      title: "Studio movies",
      description: "Movies produced by a studio UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const studio = repositories.studios.byId({ id: String(id) });
      if (studio == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, repositories.movies.byStudioId({ studio_id: studio.id }));
    },
  );

  server.registerResource(
    "shows",
    "nge://shows",
    {
      title: "Shows",
      description: "Every show in the catalog.",
      mimeType: "application/json",
    },
    async (uri) => jsonResource(uri, repositories.shows.all()),
  );

  server.registerResource(
    "show",
    new ResourceTemplate("nge://shows/{id}", {
      list: async () => ({
        resources: repositories.shows.all().map((show) => ({
          uri: `nge://shows/${show.id}`,
          name: show.title,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.shows.all().map((show) => show.id)),
      },
    }),
    {
      title: "Show",
      description: "A show by UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const show = repositories.shows.byId({ id: String(id) });
      if (show == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, show);
    },
  );

  server.registerResource(
    "show-episodes",
    new ResourceTemplate("nge://shows/{id}/episodes", {
      list: async () => ({
        resources: repositories.shows.all().map((show) => ({
          uri: `nge://shows/${show.id}/episodes`,
          name: `${show.title} episodes`,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.shows.all().map((show) => show.id)),
      },
    }),
    {
      title: "Show episodes",
      description: "Episodes belonging to a show UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const show = repositories.shows.byId({ id: String(id) });
      if (show == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, repositories.episodes.byShowId({ show_id: show.id }));
    },
  );

  server.registerResource(
    "episodes",
    "nge://episodes",
    {
      title: "Episodes",
      description: "Every episode in the catalog.",
      mimeType: "application/json",
    },
    async (uri) => jsonResource(uri, repositories.episodes.all()),
  );

  server.registerResource(
    "episode",
    new ResourceTemplate("nge://episodes/{id}", {
      list: async () => ({
        resources: repositories.episodes.all().map((episode) => ({
          uri: `nge://episodes/${episode.id}`,
          name: episode.title,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.episodes.all().map((episode) => episode.id)),
      },
    }),
    {
      title: "Episode",
      description: "An episode by UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const episode = repositories.episodes.byId({ id: String(id) });
      if (episode == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, episode);
    },
  );

  server.registerResource(
    "movies",
    "nge://movies",
    {
      title: "Movies",
      description: "Every movie in the catalog.",
      mimeType: "application/json",
    },
    async (uri) => jsonResource(uri, repositories.movies.all()),
  );

  server.registerResource(
    "movie",
    new ResourceTemplate("nge://movies/{id}", {
      list: async () => ({
        resources: repositories.movies.all().map((movie) => ({
          uri: `nge://movies/${movie.id}`,
          name: movie.title,
          mimeType: "application/json",
        })),
      }),
      complete: {
        id: completeIds(() => repositories.movies.all().map((movie) => movie.id)),
      },
    }),
    {
      title: "Movie",
      description: "A movie by UUID.",
      mimeType: "application/json",
    },
    async (uri, { id }) => {
      const movie = repositories.movies.byId({ id: String(id) });
      if (movie == null) throw new ResourceNotFoundError(uri.href);
      return jsonResource(uri, movie);
    },
  );
};

const registerPrompts = (server: McpServer) => {
  server.registerPrompt(
    "explore-studio",
    {
      title: "Explore a studio",
      description: "Look up a studio and the shows and movies it produced.",
      argsSchema: z.object({
        id: completable(z.string().describe("Studio UUID"), (value) =>
          repositories.studios
            .all()
            .map((studio) => studio.id)
            .filter((id) => id.startsWith(value)),
        ),
      }),
    },
    ({ id }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Using the NGE API tools, describe studio ${id}. List the shows and movies it produced and summarize how they fit the Evangelion timeline.`,
          },
        },
      ],
    }),
  );

  server.registerPrompt(
    "explore-show",
    {
      title: "Explore a show",
      description: "Look up a show and walk through its episodes.",
      argsSchema: z.object({
        id: completable(z.string().describe("Show UUID"), (value) =>
          repositories.shows
            .all()
            .map((show) => show.id)
            .filter((id) => id.startsWith(value)),
        ),
      }),
    },
    ({ id }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Using the NGE API tools, summarize show ${id}. Cover its studio, air dates, synopsis, and episode list.`,
          },
        },
      ],
    }),
  );
};

export const createNgeMcpServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "nge-api",
      version: "0.0.1",
      title: "Neon Genesis Evangelion API",
    },
    {
      instructions:
        "Read-only catalog of Neon Genesis Evangelion studios, shows, episodes, and movies. Prefer tools for lookups; resources mirror the same records as JSON at nge:// URIs.",
    },
  );

  registerTools(server);
  registerResources(server);
  registerPrompts(server);

  return server;
};
