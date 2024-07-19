# Stage 1: Build
FROM node:20.12.0-alpine as builder

# Install build tools and dependencies
RUN apk add --no-cache python3 make g++

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if necessary, add your build steps here)
# RUN npm run build

# Stage 2: Production
FROM node:20.12.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the application code from the builder stage
COPY --from=builder /usr/src/app ./

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["sh", "-c", "npm run migrate && npm start"]