const service = require("./service");
const api = require("./api");
const xlsxCreator = require("./utils/xlsxCreator");
const utils = require("./utils/util");

try {
  (async () => {
    const res = await api.getByPath("/");
    const basePathId = res.data.fileEntry.id;
    const listRes = await service.getResourcesByBaseid(basePathId);
    utils.createDir("./resource");
    service.pollArticleList(listRes);
    const _header = ["id", "createTime","name", "parentId", "detail"];
    const _filePath = "out_file.xlsx";
    xlsxCreator(_header, listRes, _filePath);
    console.log('生成excel成功');
  })();
} catch (error) {
  console.error(error);
}

/** 最近文章 */
// setTimeout(async () => {
//   console.log("开始爬取...");
//   await page.setContent("<script>...</script>");
//   let Cookie = await page.evaluate(() => document.cookie);
//   let _data = await utils.pollArticleList(1,30, utils.getArticleDetail);
//   console.log('_data', _data.length)
//   const _header = ["name", "summary", "count", "content"];
//   const _filePath = "out_file.xlsx";
//   xlsxCreator(_header, _data, _filePath);
// }, 1000);
