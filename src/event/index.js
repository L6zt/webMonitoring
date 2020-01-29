const eventList = {}

export const on = function (...arg) {
   const event = arg[0]
   const fn = arg[1]
   if (typeof event !== 'string') {
     return console.warn('event type must be string')
   }
   if (typeof fn !== 'function') {
     return console.warn('fn type must be function')
   }
   if (eventList.hasOwnProperty(event)) {
     return eventList[event].push(fn)
   } 
   eventList[event] = [fn]
}

export const off = function (...arg) {
   const event = arg[0]
   const fn = arg[1]
   if (typeof event !== 'string') {
     return console.warn('event type must be string')
   }
   if (typeof fn !== 'function' && typeof fn !== 'undefined') {
     return console.warn('fn type must be function')
   }
   if (fn === undefined) {
    return eventList[event] = []
   }
   const fnIndex = eventList.findIndex((func) => func === fun)
   if (fnIndex !== -1) eventList.splice(1, fnIndex)
}

export const once = function (...arg) {
   const event = arg[0]
   const fn = arg[1]
   if (typeof event !== 'string') {
     return console.warn('event type must be string')
   }
   if (typeof fn !== 'function') {
     return console.warn('fn type must be function')
   }
   const mdfiyFn = function (...arg) {
     fn.apply(null, arg)
     off(event, mdfiyFn)
   }
   on(event, mdfiyFn)
}

export const dispatch = function (...arg) {
  const event = arg[0]
  const payload= arg[1]
  if (typeof event !== 'string') {
     return console.warn('event type must be string')
  }
  const curEventList = eventList[event]
  if (curEventList === undefined) {
    return
  } else {
    curEventList.forEach(fn => {
      fn.call(null, payload)
    })
  }
}