# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json bun.lockb /app/
RUN bun install

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["bun", "run", "index.ts"]
