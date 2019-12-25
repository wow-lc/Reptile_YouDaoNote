const request = require("../utils/http");

/** 根据路径获取列表 */
const getByPath = async path => {
  return await request.post(
    `/personal/file?method=getByPath&keyfrom=web&cstk=p3k1krkw&entire=true&purge=false&path=${path}`
  );
};

/** 根据父级ID获取列表 */
const listPageByParentId = async (parentId, lastId) => {
  const path = `/personal/file/${parentId}?all=true&f=true&len=30&sort=1&isReverse=false&method=listPageByParentId&keyfrom=web&cstk=p3k1krkw`;
  if (lastId) {
    path = path + `&lastId=${lastId}`;
  }
  return await request.post(path);
};

/** 根据ID获取文章详情 */
const getArticleDetail = async fileId => {
  return await request.post(
    `/personal/sync?method=download&keyfrom=web&cstk=uutnaTVw&version=-1&fileId=${fileId}`
  );
};

/** 获取最近的列表 */
const getArticleList = async (offset, limit) => {
  return await request.post(
    `/personal/file?method=listRecent&keyfrom=web&cstk=knCd5pWk&offset=${offset}&limit=${limit}`
  );
};

module.exports = {
  getByPath,
  listPageByParentId,
  getArticleDetail,
  getArticleList
};
