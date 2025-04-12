import type { FC } from "hono/jsx";
import { Hono } from "hono";
import { logger } from 'hono/logger'
import { getRandomItems, getItemsCount, getAveragePrice, Item } from './db';

const Layout: FC = (props) => (
  <html>
    <body>{props.children}</body>
  </html>
);

const Page: FC<{ messages: string[] }> = (props: { messages: string[] }) => (
  <Layout>
    <h1>Hello Hono!</h1>
    <ul>{props.messages.map((message) => <li>{message}!!!</li>)}</ul>
  </Layout>
);

const ItemsPage: FC<{ items: Item[], count: number, avgPrice: number }> = (props) => (
  <Layout>
    <h1>Items: {props.count}</h1>
    <p>Average price: {props.avgPrice.toFixed(2)}</p>
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          {item.id}) <b>{item.name}</b> <code>{item.price.toFixed(2)}</code>
        </li>
      ))}
    </ul>
  </Layout>
);

const app = new Hono();

app.use(logger())

app.get("/", (c) => c.text("Hello, Hono with Bun!"));
app.get("/hello", (c) => c.json({ message: "Hello, World!" }));
app.get("/jsx", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Page messages={messages} />);
});
app.get("/items", (c) => {
  const items = getRandomItems();
  const count = getItemsCount();
  const avgPrice = getAveragePrice();
  return c.html(<ItemsPage items={items} count={count} avgPrice={avgPrice} />);
});

export default app;
