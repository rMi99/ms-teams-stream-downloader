
# MS Teams/Stream Video Downloader

This project provides a Dockerized solution to download recorded videos from **Microsoft Teams** or **MS Stream** using **Selenium** with **Chromium** (headless) for automated login and **ffmpeg** for video processing.

## Features
- Automated login to MS Teams/Stream using Selenium.
- Download videos using headless Chromium.
- Dockerized for easy deployment.

## Requirements
- Docker 20.10 or higher.
- Basic knowledge of Docker and Python.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:rMi99/ms-teams-stream-downloader.git
   cd ms-teams-stream-downloader
   ```

2. **Build the Docker Image**:
   ```bash
   docker build -t ms-teams-stream-downloader .
   ```

3. **Run the Container**:
   ```bash
   docker run -it --rm --name stream-downloader ms-teams-stream-downloader
   ```

4. **Download Video**:
   Edit the `download_ms_stream.py` script to add your **MS Teams** credentials and video URL, then run:
   ```bash
   python3 download_ms_stream.py
   ```

## Customization

- **Credentials**: Update `download_ms_stream.py` with your login details.
- **Video URL**: Modify the script with the MS Stream video link.

## License

This project is licensed under the MIT License.



### Key Sections:
- **Overview**: Quick description of the project.
- **Requirements**: Tools you need (Docker, basic Python knowledge).
- **Setup Instructions**: Steps to build and run the Docker image.
- **Customization**: How to change credentials and video URL.
- **License**: Specifies the license type.
