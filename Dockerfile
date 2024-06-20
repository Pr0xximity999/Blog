# Specify a base image
FROM node:alpine

#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

EXPOSE 8443

# Set up a default command
CMD [ "npm","start" ]