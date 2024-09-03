FROM arm64v8/node:20.16.0-alpine

ARG JWT_SECRET
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET

ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
ENV JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/src/app

COPY package*.json ./

USER node

RUN npm NODE_ENV=production install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"]