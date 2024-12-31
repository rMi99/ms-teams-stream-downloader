require('dotenv').config();

const puppeteer = require('puppeteer');
const ffmpegPath = require('ffmpeg-static'); 

(async () => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const videoUrl = process.env.VIDEO_URL;
    const chromiumPath = process.env.CHROMIUM_PATH;

    if (!email || !password || !videoUrl || !chromiumPath) {
        console.error('Error: Missing required environment variables.');
        return;
    }

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: chromiumPath, 
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://www.microsoftstream.com');

    await page.type('input#i0116', email);  
    await page.click('input#idSIButton9');  
    await page.waitForTimeout(2000);

    await page.type('input#i0118', password);  
    await page.click('input#idSIButton9');  // Sign-in button
    await page.waitForTimeout(5000);  // Wait for login to complete

    // Handle additional login steps like MFA if necessary

    // Now, navigate to the video URL from the .env file
    await page.goto(videoUrl); 
    await page.waitForSelector('video');  // Wait for the video element to load

    console.log('Video is available, proceeding to download...');

    // Get the video URL
    const videoURL = await page.evaluate(() => {
        // Return the URL of the video element if possible (this might vary based on the page structure)
        return document.querySelector('video').src;
    });

    console.log('Video URL:', videoURL);

    // Example of using ffmpeg to download or process video (if the video URL is available)
    const { exec } = require('child_process');
    exec(`${ffmpegPath} -i ${videoURL} -c copy downloaded_video.mp4`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error during download:', err);
            return;
        }
        console.log('Download completed:', stdout);
    });

    // Close the browser
    await browser.close();
})();
