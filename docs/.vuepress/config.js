const locales = require("./locales");

  module.exports = {
    title: "个人博客",
    description: "技术总结",
    base: "/yourProjectUrl/",
    themeConfig: {
      displayAllHeaders: false,
      locales: {
        "/": locales.local_zh,
      }
    },
    locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      "/": {
        lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
        title: "博 客",
        description: "我的博客"
      },
    },
    markdown: {
      lineNumbers: true
    },
  };