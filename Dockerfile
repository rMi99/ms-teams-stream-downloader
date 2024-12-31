FROM node:20-buster
RUN apt-get update && apt-get install -y \
    chromium \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV CHROME_BIN=/usr/bin/chromium
ENV DISPLAY=:99
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN mkdir -p ./downloads
RUN chmod 777 -R ./downloads
COPY . .
EXPOSE 8080
CMD ["node", "download_ms_stream.js"]
