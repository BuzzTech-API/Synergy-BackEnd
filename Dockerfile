FROM node:20-alpine as backend

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./nestjs .

# Install app dependencies
RUN npm install --quiet --no-optional --no-fund
RUN npm run build

RUN chown -R node:node /usr/src/app/dist
# Bundle app source
#COPY ./nestjs .

# Creates a "dist" folder with the production build
#RUN npm run build

EXPOSE 5000