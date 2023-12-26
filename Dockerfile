FROM node:18-alpine3.17 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the application source code from the host machine to the container
COPY . /app

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Start from an Ubuntu base image
FROM ubuntu

# Update the package list and install Nginx
RUN apt-get update
RUN apt-get install nginx -y

# Copy the build output from the first stage to the Nginx HTML directory
COPY --from=build /app/dist /var/www/html/

# Expose port 80 on the container
# This is the port that Nginx listens on by default
EXPOSE 80

# Start Nginx in the foreground
# This ensures that Nginx stays running and doesn't exit
CMD ["nginx","-g","daemon off;"]
