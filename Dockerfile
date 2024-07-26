FROM node:lts-slim

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json src/package-lock.json ./
RUN npm install
COPY src/ .

EXPOSE 8334

CMD [ "node", "index.js" ]