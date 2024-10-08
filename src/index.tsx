import type { FC } from "hono/jsx";
import { Hono } from "hono";
import { logger } from 'hono/logger'

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

const Page: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </Layout>
  );
};

const app = new Hono();

app.use(logger())

app.get("/", (c) => c.text("Hello, Hono with Bun!"));
app.get("/hello", (c) => c.json({ message: "Hello, World!" }));
app.get("/jsx", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Page messages={messages} />);
});

export default app;
