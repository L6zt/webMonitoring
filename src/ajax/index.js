const defaultOptions = {
  headers: {},
  type: 'get',
  async: false,
  data: null,
  success() {},
  error() {}
}
class Ajax {
  constructor(config = {}) {
    const option = Object.assign(defaultOptions, config)
    this._option = option
    this._createXhr()
    this._request(option)
  }
  _createXhr() {
    this._xhr = new XMLHttpRequest()
  }
  _setRequestHeaders(headers) {
    const { _xhr } = this
    for (let header in headers) {
      _xhr.setRequestHeader(header, headers[header])
    }
  }
  _transFormatData() {
    const { _option } = this
    const { headers, type, url, data } = _option
    const contentType = headers['Content-type'] || headers['content-type']
    switch (contentType) {
      case 'application/json': {
        this._option.data = JSON.stringify(this._option.data || {});
        break
      }
      case 'application/x-www-form-urlencoded': {
        if (type === 'post') {
          let sendData = ''
          for (let key in data) {
            sendData += `${key}=${encodeURIComponent(data[key])}&`;
          }
          sendData = sendData.replace(/&$/, '')
          this._option.data = sendData
        }
        break
      }
      default: {
        if (type === 'get') {
          for (let key in data) {
            url += `${key}=${encodeURIComponent(data[key])}&`
          }
          url = sendData.replace(/&$/, '')
          this._option.url = url
        }
      }
    }
  }
  _request(option) {
    const { _xhr } = this;
    _xhr.open(option.type, option.url, option.async);
    this.setRequestHeader(option.headers);
    this._transFormatData;
    _xhr.onreadystatechange = function() {
      if (_xhr.status === _xhr.DONE && _xhr.status === 200) {
        option.success(data, _xhr.getAllResponseHeaders())
      }
    }
    _xhr.send(_xhr.data || null)
  }
}

const ajax = function (option) {
  return new Ajax(option)
}
export default ajax