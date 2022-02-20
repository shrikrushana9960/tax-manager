FROM node:14.2.0-alpine3.11
WORKDIR /api
COPY package.json /api/
COPY package-lock.json /api/
RUN npm install
COPY src /api/src
COPY server.js /api/server.js
EXPOSE 4001
CMD ["npm", "start"]
