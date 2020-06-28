const api = require("../api");

/** 根据baseId获取目录结构 */
const getResourcesByBaseid = async (baseId, cookie) => {
  const res = await api.listPageByParentId(baseId,null, cookie);
  
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
      children = await getResourcesByBaseid(id,cookie);
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
const pollArticleList = async (resourcesList, subPath = "./resource", cookie) => {
  if (resourcesList.length <= 0) {
    return;
  }
  for (let i = 0; i < resourcesList.length; i++) {
    const { id, parentId, name, dir, createTime, children } = resourcesList[i];
    if (dir) {
      pollArticleList(children, `${subPath}/${name}`, cookie);
    } else {
      let detail = await api.getArticleDetail(id, cookie);
      console.log(detail);
      
      let detailData = detail.data;
      if(Object.prototype.toString.call(detailData) === "[object Object]") {
        detailData = JSON.stringify(detailData);
      }
      
      dataList.push({
        id,
        parentId,
        name,
        dir,
        detail: detailData,
        createTime
      })
    }
  }

  return dataList;
};

module.exports = {
  getResourcesByBaseid,
  pollArticleList
};
