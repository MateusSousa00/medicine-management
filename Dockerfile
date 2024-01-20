# Use the official Node.js 20 image on Alpine Linux
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the NestJS application
CMD ["npm", "run", "start"]
