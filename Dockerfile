FROM node:20.16.0-alpine

ARG JWT_SECRET
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET

ENV JWT_SECRET=$JWT_SECRET
ENV JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET
ENV JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET
ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"]