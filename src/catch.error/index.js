import { LOAD_SOURCE_ERROR, SCRIPT_EXECUTE_ERROR } from "../listen/type";
import { dispatch, on } from "../event";
import { event } from "@l6zt/cutils";
const win = window;
const doc = window.document;
// 处理脚本报错
// 处理文件资源加载报错

event.on(win, 'error', (e) => {
  const { message, filename, lineno, colno, srcElement } = e;
  if (filename) {
    const payload = {
      message,
      filename,
      lineno,
      colno,
    }
    console.log(payload)
    dispatch(SCRIPT_EXECUTE_ERROR,  payload);
  }
});
// 观察资源加载情况
const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach((mutation) => {
    const { type, addedNodes } = mutation;
    if (type === "childList") {
      addedNodes.forEach((el) => {
        if ( [HTMLScriptElement, HTMLImageElement,HTMLVideoElement, HTMLAudioElement, Image ].find((C) => el  instanceof C ) ) {
          event.on(el, 'error', (e) => {
            const { target } = e;
            const payload = {
              type: target.localName,
              src: target.getAttribute('src') || target.getAttribute('href')
            }
            console.log(payload)
            dispatch(LOAD_SOURCE_ERROR, payload)
          })
        }
      });
    }
  });
});

observer.observe(doc, { attributes: true, childList: true, subtree: true });
