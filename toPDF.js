
const puppeteer = require("puppeteer");

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "http://127.0.0.1:4000/resume.html",
        { waitUntil: "networkidle2" }
    );
    await page.pdf({
        path: "resume.pdf",
        format: "A4",
        margin: {
            top: "2cm",
            right: "1cm",
            bottom: "1cm",
            left: "1cm"
        }
    });
    await browser.close();
})();