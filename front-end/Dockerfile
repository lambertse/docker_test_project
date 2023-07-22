# Use the official Node.js image as the base image
FROM node:14 as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire content of the current directory to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the React app
FROM nginx:alpine as production-stage

# Copy the built React app from the previous build-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose the default port for the NGINX web server (80)
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]