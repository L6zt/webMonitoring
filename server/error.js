const sourceMap = require('source-map')
const path = require('path')
const fs = require('fs')
const findSourceMapFileName = (fileName) => {
  return new Promise((r, j) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err
      else {
        let str = data
        const fileName = str.split('sourceMappingURL=').pop().split('/').pop()
        r({fileName, fileContent: data})
      }
    })
  })
}
const readSourceMap =  async (fileName)  => {
  return new Promise((r, j) => {
    fs.readFile(fileName,  'utf8', (err, data) => {
      if (err) throw err
       else {
        r(data)
       }
    })
  })
}
const whatever = (rawSourceMap, line, column) =>  sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
  return consumer.originalPositionFor({
    line,
    column
  })
})
const getErrorMsg = async (fileName, line, column) => {
 const rawSourceMap =  await readSourceMap(fileName)
 return whatever(rawSourceMap,line, column )
}
