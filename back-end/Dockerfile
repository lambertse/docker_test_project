# Use the official Node.js image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the backend files to the working directory
COPY . .

# Expose the port your backend app is listening on
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
