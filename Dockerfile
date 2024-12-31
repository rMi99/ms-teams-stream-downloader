FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    wget \
    curl \
    ffmpeg \
    unzip \
    chromium-browser \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    xdg-utils \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install selenium
RUN wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin \
    && rm chromedriver_linux64.zip
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV DISPLAY=:99
RUN apt-get install -y xvfb
WORKDIR /data
COPY download_ms_stream.py /data/
CMD ["bash"]
