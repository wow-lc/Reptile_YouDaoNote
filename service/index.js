const fs = require("fs");
const api = require("../api");
const utils = require("../utils/util");

/** 根据baseId获取目录结构 */
const getResourcesByBaseid = async baseId => {
  const res = await api.listPageByParentId(baseId);
  const entries = res.data.entries;
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    let children = [];
    let data = {};
    const { fileEntry } = entry;
    const { id, name, parentId, dir, createTimeForSort } = fileEntry;
    data = {
      id,
      name,
      parentId,
      dir,
      createTime: createTimeForSort
    };
    if (dir) {
      children = await getResourcesByBaseid(id);
    }
    entries[i] = {
      ...data,
      children
    };
  }

  return entries;
};

/** 轮询创建目录 */
let dataList = [];
const pollArticleList = async (resourcesList, subPath = "./resource") => {
  if (resourcesList.length <= 0) {
    return;
  }
  for (let i = 0; i < resourcesList.length; i++) {
    const { id, parentId, name, dir, createTime, children } = resourcesList[i];
    if (dir) {
      utils.createDir(`${subPath}/${name}`);
      pollArticleList(children, `${subPath}/${name}`);
    } else {
      const detail = await api.getArticleDetail(id);
      let detailData = detail.data;
      if(Object.prototype.toString.call(detailData) === "[object Object]") {
        detailData = JSON.stringify(detailData);
      }
      fs.writeFile(`${subPath}/${name}`, detailData, function(err) {
        if (err) {
          throw err;
        }
      });
      dataList.push({
        id,
        parentId,
        name,
        dir,
        detail: detailData,
        createTime: new Date(createTime)
      })
    }
  }

  return dataList;
};

module.exports = {
  getResourcesByBaseid,
  pollArticleList
};
