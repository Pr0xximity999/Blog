# Specify a base image
FROM node:alpine

CMD [ "node", "--trace-warnings", "server.js" ]

#Install some dependencies
WORKDIR /usr/app

# Copy only dependency files first
COPY package*.json ./

# Install deps inside image (clean)
RUN npm ci --omit=dev

COPY . .

RUN npm install

EXPOSE 3001

# Set up a default command
CMD [ "npm","start" ]