/** @format */

const request = require("../utils/http");
const config = require("../utils/config");

/** 根据路径获取列表 */
const getByPath = async (path, cookie) => {
  return await request.post(
    `/personal/file?method=getByPath&keyfrom=web&cstk=${config.cstk}&entire=true&purge=false&path=${path}`,
    null,
    {
      header: {
        Cookie: cookie
      }
    }
  );
};

/** 根据父级ID获取列表 */
const listPageByParentId = async (parentId, lastId, cookie) => {
  let path = `/personal/file/${parentId}?all=true&f=true&len=30&sort=1&isReverse=false&method=listPageByParentId&keyfrom=web&cstk=${config.cstk}`;
  if (lastId) {
    path = path + `&lastId=${lastId}`;
  }
  return await request.post(path, null, {
    header: {
      Cookie: cookie
    }
  });
};

/** 根据ID获取文章详情 */
const getArticleDetail = async (fileId, cookie) => {
  return await request.post(
    `/personal/sync?method=download&keyfrom=web&cstk=${config.cstk}&version=-1&fileId=${fileId}`,
    null,
    {
      header: {
        Cookie: cookie
      }
    }
  );
};

/** 获取最近的列表 */
const getArticleList = async (offset, limit, cookie) => {
  return await request.post(
    `/personal/file?method=listRecent&keyfrom=web&cstk=${config.cstk}&offset=${offset}&limit=${limit}`,
    null,
    {
      header: {
        Cookie: cookie
      }
    }
  );
};

module.exports = {
  getByPath,
  listPageByParentId,
  getArticleDetail,
  getArticleList
};
