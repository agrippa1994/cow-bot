FROM node:12

RUN apt update && apt install -y ffmpeg

WORKDIR /usr/share/app
COPY . .

RUN npm install --prod
CMD [ "node", "main.js" ]
