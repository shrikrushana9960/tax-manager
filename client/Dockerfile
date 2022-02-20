FROM node:14.2.0-alpine3.11
WORKDIR /client
COPY package*.json /client/
RUN npm install
COPY . /client/
EXPOSE 3000
CMD ["npm", "start"]
