/** 封装http库的地方 */
const Axios = require("axios");
const Qs = require("qs");
const config = require("./config");

// 创建自定义axios实例
const httpInstance = Axios.create({
  baseURL: config.domain_api,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    Cookie: config.cookie
  },
  transformRequest: [
    (data, headers) => {
      return JSON.stringify(data);
    }
  ],
  responseType: "json",
  paramsSerializer: function(params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  }
});

// 添加响应请求拦截器
httpInstance.interceptors.response.use(
  res => res,
  function(error) {
    return Promise.reject(error);
  }
);

const request = {};

request.get = (url, data = {}, config = {}) => {
  config.header = {
    ...config.header
  };
  return httpInstance.get(url, data, config);
};

request.post = (url, data = {}, config = {}) => {
  config.header = {
    ...config.header
  };
  return httpInstance.post(url, data, config);
};

module.exports = request;
