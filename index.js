/** 页面爬虫 */
const axios = require('axios');
const puppeteer = require("puppeteer");
const config = require('./config');

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    await page.on("request", interceptedRequest => {
      if (
        interceptedRequest.url().endsWith(".jpg") ||
        interceptedRequest.url().endsWith(".png")
      ) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });

    await page.setViewport({
      width: 1920,
      height: 1080
    });

    page.goto("https://note.youdao.com/signIn/index.html");

    // await page.goto("https://note.youdao.com/web/#/file/recent/markdown/5AEEFB9129C44C41A335984A98E17931/");

    setInterval(async () => {
      console.log('轮询查询...');
      
      //拿到所有子元素
      const info = page.$$eval(".list-li", el => {
          return el.map(item => item.id);
      });

      await info.then(async data => {
        console.log(data);
        
        data.map((item, index) => {
          axios({
            method: 'post',
            url: config.getArticleDetail  + `&fileId=${item}&version=-1`,
            // data: {
            //   fileId: data[0],
            //   version: '-1'
            // },
            headers: {
              'Cookie': config.cookie,
              // 'Content-type': 'application/json;charset=UTF-8'
            }
          }).then(res =>{
            console.log(`===============${index}=====================`);
            console.log(res.data);
            console.log('====================================');
          })
          .catch(err => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
          })
        })
      });
    },30 * 1000);

    // await browser.close();
  })();
} catch (error) {
  console.log(error);
}
