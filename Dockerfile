FROM node:20-alpine3.18
WORKDIR /
COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]