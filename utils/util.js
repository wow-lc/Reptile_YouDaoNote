const fs = require("fs");

function throttle(fn, timehold) {
  let startTime = new Date().getTime();
  const context = this;

  return function() {
    const currentTime = new Date().getTime();
    if (currentTime - startTime >= timehold) {
      fn.apply(context, [...arguments]);

      startTime = currentTime;
    }
  };
}

function createDir(path) {
  try {
    fs.statSync(path);
  } catch (error) {
    fs.mkdirSync("./resource");
  }
}
module.exports = {
  throttle,
  createDir
};
