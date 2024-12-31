require('dotenv').config();

const puppeteer = require('puppeteer');
const ffmpegPath = require('ffmpeg-static'); 
const readline = require('readline');  
const fs = require('fs');
const path = require('path');

(async () => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const videoUrl = process.env.VIDEO_URL;
    const chromiumPath = process.env.CHROMIUM_PATH;
    const downloadPath = process.env.DOWNLOAD_PATH || './downloads'; 

    if (!email || !password || !videoUrl || !chromiumPath) {
        console.error('Error: Missing required environment variables.');
        return;
    }

    if (!fs.existsSync(downloadPath)) {
        console.log(`Creating download folder at ${downloadPath}`);
        fs.mkdirSync(downloadPath, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: chromiumPath,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--disable-dev-shm-usage`,
        ],
    });

    const page = await browser.newPage();

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    await page.setUserAgent(userAgent);

    await page.setViewport({ width: 1366, height: 768 });

 
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    await page.goto('https://www.microsoftstream.com');
    await page.waitForTimeout(randomDelay(2000, 4000));

 
    await page.type('input#i0116', email, { delay: randomDelay(100, 200) }); 
    await page.click('input#idSIButton9');
    await page.waitForTimeout(randomDelay(2000, 4000));

    await page.type('input#i0118', password, { delay: randomDelay(100, 200) }); 
    await page.click('input#idSIButton9');
    await page.waitForTimeout(randomDelay(4000, 6000));

    await page.waitForSelector('input[name="otp"]'); 

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Please enter the MFA code: ', async (otpCode) => {
        await page.type('input[name="otp"]', otpCode);
        await page.click('input#idSIButton9'); 
        await rl.close();

        await page.waitForTimeout(randomDelay(4000, 6000));
        await page.goto(videoUrl);
        await page.waitForSelector('video'); 

        console.log('Video is available, proceeding to download...');

     
        const videoURL = await page.evaluate(() => {
            return document.querySelector('video').src;
        });

        console.log('Video URL:', videoURL);

     
        await page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath
        });

  
        const { exec } = require('child_process');
        const downloadFilePath = path.join(downloadPath, 'downloaded_video.mp4');
        exec(`${ffmpegPath} -i ${videoURL} -c copy ${downloadFilePath}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error during download:', err);
                return;
            }
            console.log('Download completed:', stdout);
        });

        await browser.close();
    });
})();
