const axios = require("axios");
const config = require("./config");

let count = 0;

/** 获取文章详情 */
const getArticleDetail = async fileInfo => {
  try {
    const res = await axios.post(
      config.ARTICLE_DETAIL_Url + `&fileId=${fileInfo.id}`,
      {},
      { headers: { Cookie: config.cookie } }
    );
    count++;
    return {
      count,
      name: fileInfo.name,
      summary: fileInfo.summary,
      content: res.data
    };
  } catch (error) {
    console.error(error);
  }
};

/** 获取文章列表 */
const getArticleList = async (offset, limit) => {
  try {
    const res = await axios.post(
      config.ARTICLE_LIST_URL + `&offset=${offset}&limit=${limit}`,
      {},
      { headers: { Cookie: config.cookie } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/** 轮询文章列表
 *
 * @param {Number} offset
 * @param {Number} limit
 * @param {Function} bc
 */
const pollArticleList = async (offset = 1, limit, bc) => {
  let articleList = [];

  const data = await getArticleList(offset, limit);
  if (data && data.length > 0) {
    data.map(async item => {
      let res = await bc(item.fileEntry);
      articleList.push(res);
    });
    // 判断是否解析到最后的数据
    if (data.length == limit) {
      let d = await pollArticleList(offset + 1, limit, bc);
      articleList.push(d);
    }
  }

  return articleList;
};

module.exports = {
  getArticleList,
  getArticleDetail,
  pollArticleList
};
