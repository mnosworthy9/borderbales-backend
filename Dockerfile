FROM node:20.16.0-alpine
WORKDIR /usr/src/app
COPY dist/ .
EXPOSE 8080
CMD ["node", "index.ts"]