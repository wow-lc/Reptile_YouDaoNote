/** @format */

const service = require("./service");
const api = require("./api");
const xlsxCreator = require("./utils/xlsxCreator");

const youdaoFn = (cookie, bc) => {
  try {
    (async () => {
      const res = await api.getByPath("/", cookie);
      const basePathId = res.data.fileEntry.id;
      const listRes = await service.getResourcesByBaseid(basePathId, cookie);
      const _data = await service.pollArticleList(listRes, cookie);
      console.log(_data);
      const _header = ["id", "parentId", "name", "detail"];
      const _filePath = "out_file.xlsx";
      await xlsxCreator(_header, _data, _filePath);
      console.log("生成excel成功");
    })();
    bc();
  } catch (error) {
    console.error(error);
  }
};

window.youdao = youdaoFn;
