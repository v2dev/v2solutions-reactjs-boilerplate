# Stage 1: Build
FROM node:14-alpine AS build

# Create and set working directory
WORKDIR /usr/src/app

# Copy only package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production Image
FROM node:14-alpine AS production

# Create and set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the build stage
COPY --from=build /usr/src/app/dist ./

# Copy package.json and install only production dependencies
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]