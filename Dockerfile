# Specify a base image
FROM node:alpine

CMD [ "node", "--trace-warnings", "server.js" ]

#Install some dependencies
WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

EXPOSE 3001

# Set up a default command
CMD [ "npm","start" ]