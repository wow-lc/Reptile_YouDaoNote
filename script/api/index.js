/** @format */

const request = require("../utils/http");

function getCstkForCookie(cookie) {
  const reg = /YNOTE_CSTK=(.+?)\;/g;
  let result = '';
  
  if(Array.isArray(cookie)) {
    result = reg.exec(cookie.join(';'))[1];
  } else {
    result = reg.exec(cookie)[1];
  }
  
  return result;
}

/** 根据路径获取列表 */
const getByPath = async (path, cookie) => {
  return await request.post(
    `/personal/file?method=getByPath&keyfrom=web&cstk=${getCstkForCookie(cookie)}&entire=true&purge=false&path=${path}`,
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
  let path = `/personal/file/${parentId}?all=true&f=true&len=30&sort=1&isReverse=false&method=listPageByParentId&keyfrom=web&cstk=${getCstkForCookie(cookie)}`;
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
    `/personal/sync?method=download&keyfrom=web&cstk=${getCstkForCookie(cookie)}&version=-1&fileId=${fileId}`,
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
    `/personal/file?method=listRecent&keyfrom=web&cstk=${getCstkForCookie(cookie)}&offset=${offset}&limit=${limit}`,
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
