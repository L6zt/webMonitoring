import {on} from '../event'
import {LOAD_SOURCE_ERROR, SCRIPT_EXECUTE_ERROR, AJAX_STATUS_ERROR, AJAX_NETWORK_ERROR } from './type'
import ajax from '../ajax'
const HOST = ''
const uploadAjaxNetWorkErrorApi = `${host}`
const uploadLoadSourceErrorAPi = `${host}`
const uploadScriptExecuteErrorApi = `${host}`
const uploadAjaxStatusErrorApi = `${host}`
// 监听

on(AJAX_NETWORK_ERROR, (payload) => {
  ajax({
    type: 'post',
    url: uploadAjaxNetWorkErrorApi,
    data: payload
  })
})

// 监听

on(LOAD_SOURCE_ERROR, (payload) => {
   ajax({
     type: 'post',
     url: uploadLoadSourceErrorAPi,
     data: payload
   })
})

//监听

on(SCRIPT_EXECUTE_ERROR, (payload) => {
  ajax({
    type: 'post',
    url: uploadScriptExecuteErrorApi,
    data: payload
  })
})

//监听

on(AJAX_STATUS_ERROR, (payload) => {
  ajax({
    type: 'post',
    url: uploadAjaxStatusErrorApi,
    data: payload
  })
})