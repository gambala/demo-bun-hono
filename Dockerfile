FROM oven/bun:alpine
  WORKDIR /app

  COPY package.json bun.lockb /app/
  RUN bun install --production

  COPY . /app

  EXPOSE 3000

  CMD ["bun", "run", "src/index.tsx"]
