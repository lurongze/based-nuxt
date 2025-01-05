import ClipboardJS from "clipboard";

export function copyTextToClipboard(text = "", cb) {
  const tag = document.createElement("button");
  tag.className = "copyTmpIdName";
  tag.style.display = "none";
  tag.setAttribute("data-clipboard-text", text);
  document.body.appendChild(tag);
  const clipboard = new ClipboardJS(`.copyTmpIdName`);
  setTimeout(() => {
    tag.click();
  }, 0);
  clipboard.on("success", function (e) {
    cb();
    clipboard.destroy();
    tag.remove();
  });
  clipboard.on("error", function (e) {
    alert("copy error");
    clipboard.destroy();
  });
}

export function isImageUrl(url) {
  // 定义一个简单的正则表达式来匹配常见的图片文件扩展名
  const pattern = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;
  return pattern.test(url);
}
