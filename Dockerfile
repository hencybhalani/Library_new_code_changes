# Use a Node.js image that supports Node.js version 20
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install Angular CLI globally
RUN npm install -g @angular/cli@12

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]