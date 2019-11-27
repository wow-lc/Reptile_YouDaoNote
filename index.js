/** 通过接口爬虫 */
const puppeteer = require("puppeteer");
const config = require("./config");
const utils = require("./utils");
const xlsxCreator = require("./xlsxCreator");

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    /** 优化过滤图片资源的请求 */
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

    /** 设置窗口大小 */
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    page.goto(config.SIGNIN_URL);

    setTimeout(async () => {
      console.log("开始爬取...");
      await page.setContent("<script>...</script>");
      let Cookie = await page.evaluate(() => document.cookie);
      let _data = await utils.pollArticleList(1, 30, utils.getArticleDetail);
      const _header = ["name", "summary", "count", "content"];
      const _filePath = "out_file.xlsx";
      xlsxCreator(_header, _data, _filePath);
    }, 10 * 1000);

    // await browser.close();
  })();
} catch (error) {
  console.log(error);
}

/** remark通过页面爬虫的方法 */

// const axios = require("axios");
//拿到所有子元素
// const info = page.$$eval(".list-li", el => {
//     return el.map(item => item.id);
// });

// await info.then(async data => {
//   console.log(data);
//   /** 获取文章详情信息 */
//   data.map((item, index) => {
//     const data = utils.getArticleDetail(item, {Cookie});
//     console.log(`==================${index}==================`);
//     console.log(data);
//     console.log('====================================');
//   })
// });
