# Use the official Bun image
FROM oven/bun:alpine

# Set the working directory
WORKDIR /app

# Install curl for Kamal health checks
RUN apk add --no-cache curl

# Copy package.json and install dependencies
COPY package.json bun.lockb /app/
RUN bun install --production

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["bun", "run", "src/index.tsx"]
