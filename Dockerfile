FROM node:24.22.1-alpine

RUN apk add ffmpeg

WORKDIR /usr/share/app
COPY . .

RUN npm install --prod
CMD [ "node", "main.js" ]
