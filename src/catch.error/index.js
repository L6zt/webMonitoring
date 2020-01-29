import { LOAD_SOURCE_ERROR, SCRIPT_EXECUTE_ERROR } from '../listen/type'
import { dispatch } from '../event'
const win = window;
// 处理脚本报错
// 处理文件资源加载报错
win.addEventListener(
  'error',
  function(e) {
    const { message, filename, lineno, colno, srcElement} = e
    if (srcElement) {
       if (srcElement instanceof HTMLImageElement) {
         dispatch(LOAD_SOURCE_ERROR, {
           src: srcElement.getAttribute('src'),
           type: 'img'
         })
       }
       if (srcElement instanceof HTMLScriptElement) {
         dispatch(LOAD_SOURCE_ERROR, {
           src: srcElement.getAttribute('src'),
           type: 'script'
         })
       }
    } else {
     dispatch(SCRIPT_EXECUTE_ERROR, {
      message,
      filename,
      lineno,
      colno
    })
    }
  },
  {
    passive: true,
    capture: true
  }
)
