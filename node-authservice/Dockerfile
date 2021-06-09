FROM node:14.11

# Create app
RUN mkdir /app

# Update repo
RUN apt-get update

#Handling sshpass conection zithout ssh keys
# RUN apt-get install tree

#Installing nodemon for restarting server every time
RUN npm i -g nodemon && npm i -g typescript

WORKDIR /app

CMD [ "nodemon", "index.js" ]
