import {dispatch} from './event'
import {AJAX_RESPONSE_TIME, AJAX_STATUS_ERROR} from './listen/type.js.js.js'
// 全局变量
const win = window
// 标准ajax
const XMLHttpRequest = win.XMLHttpRequest

// fetch
const fetch = win.fetch
//out XML
const OutXMLHttpRequest = function () {
  const startTime = new Date().getTime()
  const xhr  = new XMLHttpRequest()
  const self = this
  const readystatechangeEvent = []
  let url = null
  let body = null
  const catchReadyStateErrorCb = function () {
    const endTime = new Date().getTime()
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const diffTime = endTime = startTime
      dispatch(AJAX_RESPONSE_TIME, diffTime)
    } else {
      dispatch(AJAX_STATUS_ERROR, {
        url,
        body,
      })
    }
  }
  readystatechangeevent.push(catchReadyStateErrorCb)
  // 代理 xhr 对象
  for(let key in xhr) {
    Object.defineProperty(self, key, {
      get() {
        return xhr[key]
      },
      set(...arg){
        switch (key) {
          case 'onreadystatechange' : {
            readystatechangeEvent[1] = arg
            break
          }
          case 'send' : {
            body = arg
            xhr[key].call(xhr, arg)
            break
          }
          case 'open' : {
            url = arg[1]
            xhr[key].call(xhr, arg)
            break
          }
          default: {
           if(typeof xhr[key] === 'function') {
             xhr[key].apply(xhr, arg)
           } else {
             xhr[key] = arg
           }
        }
      }
     }
   })
  }
  // 检查状态变更
  xhr.onreadystatechange = function (e,) {
    readystatechangeEvent.forEach((fn) => {
      if (typeof fn === 'function') {
        fn.call(xhr, e)
      }
    })
  }
  return self
}
win.XMLHttpRequest = OutXMLHttpRequest
