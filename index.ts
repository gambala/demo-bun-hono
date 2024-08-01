import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello, Hono with Bun!'));

app.get('/hello', (c) => c.json({ message: 'Hello, World!' }));

export default app;
