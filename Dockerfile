# Stage 1: Build Frontend
FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Backend
FROM node:20
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
WORKDIR /app
COPY backend/ ./backend/
# Copy the built frontend files from stage 1
COPY --from=build-stage /app/dist ./dist

# Environmental variables will be provided by Cloud Run
EXPOSE 8080
ENV PORT=8080

CMD ["node", "backend/server.js"]
