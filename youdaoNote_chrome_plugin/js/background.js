/** @format */

/**
 * listener
 */
chrome.runtime.onMessage.addListener(data => {
  let { to, action, msg } = data;
  if (to === "background") {
    if (action === "success") {
      sendNotificat(msg);
    } else {
      sendNotificat(msg);
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

const sendNotificat = (msg) => {
  chrome.notifications.create(
    Math.random() + "", // id
    {
      type: "list",
      iconUrl: "assets/icon.png",
      appIconMaskUrl: "assets/icon.png",
      title: "YouDaoNote Reptile",
      message: "V1.0.1",
      contextMessage: msg,
      items: [{ title: "提示", message: msg }],

      eventTime: Date.now() + 2000
    },

    id => {
      console.log(id);
    }
  );
};
