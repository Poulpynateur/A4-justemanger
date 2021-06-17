FROM node:14.11

# Create app directory
WORKDIR /app
COPY package*.json /app
RUN npm install

COPY . /app

CMD [ "npm", "run", "dev" ]