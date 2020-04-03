FROM node:12

WORKDIR /usr/share/app
COPY . .

RUN apt update && apt install -y ffmpeg
RUN npm install --prod
CMD [ "node", "main.js" ]

