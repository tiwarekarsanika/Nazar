# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
