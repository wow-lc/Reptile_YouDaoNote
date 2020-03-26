/** @format */

/**
 * listener
 */
chrome.runtime.onMessage.addListener(msg => {
  let {to, action } = msg;
  if(to === "background") {
    if(action === "success") {
      sendNotificat();
    }
  }
});

/**
 * create meuns
 */
chrome.contextMenus.create({
  title: "生成个人笔记Excel",
  onclick: function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { to: "inject" });
    });
  }
});

const sendNotificat = () => {
  chrome.notifications.create(
    Math.random() + "", // id
    {
      type: "list",

      iconUrl: "assets/icon.png",

      appIconMaskUrl: "assets/icon.png",

      title: "YouDaoNote Reptile",

      message: "V1.0.1",

      contextMessage: "生成excel完成！",
      items: [
        { title: "提示", message: "生成excel完成！" },
      ],

      eventTime: Date.now() + 2000
    },

    id => {
      console.log(id);
    }
  );
};
