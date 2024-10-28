import { OpenAPIHono, createRoute } from '@hono/zod-openapi'

const base = createRoute({
  tags: ['Hello world'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'Return "Hello, world!"',
    },
  },
})

const routes = {
  base,
}

const helloWorld = new OpenAPIHono();

helloWorld.openapi(routes.base, (c) => c.text("Hello, world!"));

export default helloWorld;
