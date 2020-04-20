/**
 *  生成vuepress
 *
 * @format
 */
var inquirer = require("inquirer");

const service = require("./service");
const api = require("./api");

const promptList = [
    {
      type: "input",
      message: "请输入有道云笔记的cookie:",
      name: "youdaoCookie",
      default: "", // 默认值
    },
    {
      type: "input",
      message: "请输入cstk\n(详情见readme.md):",
      name: "cstk",
      default: "LaL6_6t1",
    },
];

inquirer.prompt(promptList).then(async ({ youdaoCookie, cstk }) => {
  // if(!youdaoCookie) {
  //     console.error('\n有道云cookie值不能为空');
  //     return;
  // }
  // if(!cstk) {
  //     console.error("\ncstk值不能为空");
  //     return;
  // }
  let cookie = 'OUTFOX_SEARCH_USER_ID=191435147@10.169.0.84; OUTFOX_SEARCH_USER_ID_NCOO=516800679.5124368; __yadk_uid=3351ejkWgHIUL91GHG4AGtAqkA0wnSY0; _ga=GA1.2.1040643691.1577171157; Hm_lvt_30b679eb2c90c60ff8679ce4ca562fcc=1584068493,1584953896,1585186815; Hm_lvt_daa6306fe91b10d0ed6b39c4b0a407cd=1585816145,1586318178; JSESSIONID=aaaQx37cB_7mNabAuawgx; YNOTE_CSTK=9hfZxlUb; _gid=GA1.2.501706696.1587372280; _gat=1; YNOTE_SESS=v2|Qd1OHvkpWyUMPMwynLYG0PFPMlEOLgB0Ym64zM0MqFRqLRfzEh4Yf0kfO4pS0HwK0wFPLQF64640Qz0LezO4pz06KOfPFnMe4R; YNOTE_PERS=v2|wxoa||YNOTE||web||-1||1587374952253||125.118.223.233||weixinobU7VjmZ-x5KGNb6JqXHxQMa_BQI||wKh4TLPLYERzfPLJuPLPLRT4k4zM64zWRqLk4kW0HkERQF0Hl5RLz50PB6LwyhfYA0eZhMUmhLPF0UMP4Ol0LUA0; YNOTE_LOGIN=3||1587374952260';
  try {
    const res = await api.getByPath("/", cookie);
  } catch (error) {
    console.error(error);
  }
});
