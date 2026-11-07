const puppeteer = require('../node_modules/puppeteer-core');
(async()=>{const browser=await puppeteer.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--no-sandbox','--disable-gpu']});const page=await browser.newPage();await page.setViewport({width:1200,height:1500,deviceScaleFactor:1});await page.goto('file:///'+process.cwd().replace(/\\/g,'/')+'/promo-video/linkedin-poster/stclearnit-linkedin-poster.svg',{waitUntil:'load'});await page.screenshot({path:'promo-video/linkedin-poster/STC-Learnit-LinkedIn-poster.png'});await browser.close();})();


