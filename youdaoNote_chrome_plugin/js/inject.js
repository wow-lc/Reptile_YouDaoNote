/** @format */

let toastDiv;
document.addEventListener("DOMContentLoaded", () => {
  // 在windows注册toast组件
  toastDiv = document.createElement("div");
  toastDiv.id = "youdao-toast";
  toastDiv.className = "yd-toast";
  document.body.appendChild(toastDiv);
});

chrome.runtime.onMessage.addListener(msg => {
  let { to, action } = msg;
  if (to === "inject") {
    let youdaoCookie = document.cookie.split(";").splice(2);
    showToast("获取个人笔记中，可能需要几十秒生成...")
    window
      .youdao(youdaoCookie)
      .then(() => {
        chrome.runtime.sendMessage({ to: "background", action: "success", msg: "生成excel完成！" });
      })
      .catch(err => {
        chrome.runtime.sendMessage({ to: "background", action: "error", msg: err.toString() });
      });
  }
});

const showToast = msg => {
  toastDiv.innerText = msg;
  toastDiv.style.display = "block";
  setTimeout(() => {
    toastDiv.style.display = "none";
  }, 2000);
};
