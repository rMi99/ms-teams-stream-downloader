Here is the **README.md** for your project that explains the setup and usage for both **Docker** and **local Ubuntu dependencies**:

---

# Microsoft Teams/Stream Video Downloader

This project automates logging into **Microsoft Stream** to download videos using **Puppeteer** and **FFmpeg**. It can be run using **Docker** or locally with the necessary dependencies installed on **Ubuntu**.

## Requirements

### For Local Setup:
- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Chromium** or **Google Chrome**
- **FFmpeg**

### For Docker Setup:
- **Docker** (installed on your machine)

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone git@github.com:rMi99/ms-teams-stream-downloader.git
cd ms-teams-stream-downloader
```

### 2. Install Dependencies

#### **For Local Setup**:
You need to install **Chromium**, **FFmpeg**, and **Node.js** dependencies.

Run the following commands to install them on **Ubuntu**:

```bash
# Install Chromium and FFmpeg
sudo apt-get update
sudo apt-get install -y chromium ffmpeg

# Install Node.js and npm (if not already installed)
sudo apt-get install -y nodejs npm

# Install project dependencies
npm install
```

#### **For Docker Setup**:
Create a **Dockerfile** in the project directory (if not already created) and build the Docker image using the following steps:

1. **Create Dockerfile** (see the Dockerfile section below).
2. **Build Docker Image**:
   ```bash
   docker build -t ms-teams-stream-downloader .
   ```

## Configuration

### 1. Set Up the `.env` File

In the project root directory, create a `.env` file with the following variables:

```dotenv
EMAIL=your_email@example.com
PASSWORD=your_password
VIDEO_URL=https://web.microsoftstream.com/video/YOUR_VIDEO_ID
CHROMIUM_PATH=/usr/bin/chromium
```

**Explanation**:
- `EMAIL`: Your Microsoft Teams/Stream login email.
- `PASSWORD`: Your Microsoft Teams/Stream password.
- `VIDEO_URL`: The URL of the video you want to download from Microsoft Stream.
- `CHROMIUM_PATH`: The path to your **Chromium** or **Google Chrome** binary (used by Puppeteer).

> **Note**: Add the `.env` file to `.gitignore` to prevent sensitive information from being pushed to version control.

### 2. Add `.env` to `.gitignore`

Create a `.gitignore` file to ensure the `.env` file is not committed:

```gitignore
# Ignore .env file
.env
```

## Usage

### 1. Run the Script Locally

After setting up the `.env` file, you can run the script using Node.js:

```bash
node download_ms_stream.js
```

This will:
1. Launch a headless **Chromium** browser using **Puppeteer**.
2. Log in to **Microsoft Stream** with the credentials from the `.env` file.
3. Navigate to the video URL and download the video using **FFmpeg**.

### 2. Run the Script Using Docker

If you prefer to run the script inside a Docker container, follow these steps:

1. **Build the Docker Image**:
   ```bash
   docker build -t ms-teams-stream-downloader .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run --rm -it ms-teams-stream-downloader
   ```

This will:
1. Launch the script inside a Docker container.
2. Perform the same login and video download as in the local setup.



## Troubleshooting

- **Error: Missing required environment variables**: Make sure the `.env` file contains all the necessary variables.
- **Chromium not found**: Verify that Chromium is installed and the path in `.env` matches the installation.
- **FFmpeg issues**: Ensure **FFmpeg** is correctly installed and accessible from the command line.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is for **personal use** and educational purposes. Ensure compliance with **Microsoft's terms of service** before downloading content.

