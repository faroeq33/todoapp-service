# Todoapp service
An exercise to create a simple todoapp service

## Scripts

- `npm run dev`: Starts the server in development mode with hot-reloading.
- `npm start`: Starts the server in production mode.

## Docker Compose

This application can be run using Docker Compose. This will create a container for the application and another for the database.

1. Build the Docker images: `docker compose build`
2. Start the containers: `docker compose up -d`. Check the running containers by opening docker desktop.

To stop the containers, use: `docker-compose down`
