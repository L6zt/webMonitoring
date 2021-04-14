import { dispatch } from "../event";
import { AJAX_RESPONSE_TIME, AJAX_STATUS_ERROR } from "../listen/type";
// 全局变量
const win = window;
// 标准ajax
const XMLHttpRequest = win.XMLHttpRequest;
// fetch
const fetch = win.fetch;
//out XML
const OutXMLHttpRequest = function () {
  const startTime = Date.now();
  const xhr = new XMLHttpRequest();
  const self = this;
  const readystatechangeEvent = [];
  const onerrorEvent = []
  let url = null;
  let body = null;
  const catchReadyStateErrorCb = function () {
    const endTime = Date.now();
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

      let diffTime = endTime - startTime;
      dispatch(AJAX_RESPONSE_TIME, diffTime);
    } else {
      dispatch(AJAX_STATUS_ERROR, {
        url,
        body,
      });
    }
  };
  readystatechangeEvent.push(catchReadyStateErrorCb);
  // 代理 xhr 对象
  for (let key in xhr) {
    Object.defineProperty(self, key, {
      get() {
        console.log(key, 'get')
        if (
           typeof xhr[key]  === 'function'
        ) {
          return xhr[key].bind(xhr);
        }
        return xhr[key];
      },
      set(arg) {
        console.log(key, 'set')
        switch (key) {
          case "onreadystatechange": {
            const  fn  = arg
             fn && (readystatechangeEvent[1] = fn);
            break;
          }
          default: {
              xhr[key] = arg;
          }
        }
      },
    });
  }
  // 检查状态变更
  xhr.onreadystatechange = function (e) {
    readystatechangeEvent.forEach((fn) => {
      if (typeof fn === "function") {
        fn.call(xhr, e);
      }
    });
  };
  return self;
};
win.XMLHttpRequest = OutXMLHttpRequest;
