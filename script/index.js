/** @format */

const service = require("./service");
const api = require("./api");
const xlsxCreator = require("./utils/xlsxCreator");

const youdaoFn = async cookie => {
  const res = await api.getByPath("/", cookie);
  const basePathId = res.data.fileEntry.id;
  const listRes = await service.getResourcesByBaseid(basePathId, cookie);
  const _data = await service.pollArticleList(listRes, "./resource", cookie);
  const _header = ["id", "parentId", "name", "detail"];
  const _filePath = "out_file.xlsx";
  await xlsxCreator(_header, _data, _filePath);
  console.log("生成excel成功");
};

window.youdao = youdaoFn;
