import packageXhr from './package.xhr'
import ajax from './ajax'
import catchError from './catch.error'
// import listen from './listen'
import performance from './performance'
import $ from 'jquery'
window.$ =$
console.log('init')
$.ajax({
  type: 'GET',
  url: 'http://localhost:8080/montoring.js',
  dataType: 'html',
  success(data) {
    console.log(123)
    console.log(data, 'data')
  },
  error(err){
    console.log(err)
  }
})