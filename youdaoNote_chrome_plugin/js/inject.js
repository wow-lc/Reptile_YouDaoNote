
let toastDiv;
document.addEventListener("DOMContentLoaded",() => {
    // 在windows注册toast组件
    toastDiv = document.createElement("div");
    toastDiv.id = "youdao-toast";
    toastDiv.className = "yd-toast"
    document.body.appendChild(toastDiv);
})

chrome.runtime.onMessage.addListener(msg => {
    let {to, action } = msg;
    if(to === 'inject') {
        let youdaoCookie = document.cookie.split(";").splice(2);
        window.youdao(youdaoCookie,showToast("生成成功!"));
        chrome.runtime.sendMessage({to: 'background', action: 'success'});
    }
})

const showToast = (msg) => {
    toastDiv.innerText = msg;
    toastDiv.style.display = "block";
    setTimeout(()=> {
        toastDiv.style.display = "none";
    },2000)
}