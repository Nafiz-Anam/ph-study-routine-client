# Stage 1: Building the code
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the build from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

RUN ls -la
# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
