FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/api-gateway apps/api-gateway
COPY libs libs

RUN npm install -r --legacy-peer-deps

RUN npm run build api-gateway

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/api-gateway/main"]