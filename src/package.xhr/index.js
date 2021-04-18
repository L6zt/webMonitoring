import { dispatch } from "../event";
import { AJAX_RESPONSE_TIME, AJAX_STATUS_ERROR } from "../listen/type";

const xhrMdifiy = (
  options = {
    witheList: [],
  }
) => {
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
    const onerrorEvent = [];
    let body = null;
    const rHeaders = [];
    let type = '';
    const catchNormalRequestStatus = function (e) {
      const { currentTarget } = e;
      const { response, responseURL } = currentTarget;
      const endTime = Date.now();
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let diffTime = endTime - startTime;
          dispatch(AJAX_RESPONSE_TIME, diffTime);
        } else {
          const requestHeaders = rHeaders.reduce((p, q) => {
            return {
              ...p,
              [q[0]]: q[1],
            };
          }, {});

          if (typeof body === "string") {
            body = body;
          }

          if (body instanceof FormData) {
            const bCopy = {};
            for (let pair of formData.entries()) {
              if (bCopy[1] instanceof Blob) {
                bCopy[pair[0]] = {
                  fileName: bCopy[1].fileName,
                  size: bCopy[1].size,
                };
              } else {
                bCopy[pair[0]] = pair[1];
              }
            }
          }

          if (body instanceof Blob) {
            const bCopy = {};
            bCopy = {
              fileName: body.fileName,
              size: body.size,
            };
          }

          if (body instanceof Object) {
            body = JSON.stringify(body);
          }
          const postData = {
            type,
            body,
            response,
            responseURL,
            requestHeaders,

          }
          console.log(postData)
          dispatch(AJAX_STATUS_ERROR, postData);
        }
      }
    };
    //
    readystatechangeEvent.push(catchNormalRequestStatus);
    // 代理 xhr 对象
    for (let key in xhr) {
      if (["setRequestHeader", "send", 'open'].includes(key)) {
        continue;
      }
      Object.defineProperty(self, key, {
        get() {
          if (typeof xhr[key] === "function") {
            return xhr[key].bind(xhr);
          }
          return xhr[key];
        },
        set(arg) {
          switch (key) {
            case "onreadystatechange": {
              const fn = arg;
              fn && readystatechangeEvent.push(fn);
              break;
            }
            default: {
              xhr[key] = arg;
            }
          }
        },
      });
    }
    
    self.open = function (...arg) {
      type  = arg[0]
      xhr.open.apply(xhr, arg)
    }
    self.send = function (data) {
      body = data;
      xhr.send(data);
    };

    self.setRequestHeader = function (...arg) {
      rHeaders.push(arg);
      xhr.setRequestHeader(...arg);
    };
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
};

export default xhrMdifiy;
