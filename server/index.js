const { SourceMapConsumer } = require('source-map')
const path = require('path')
const fs = require('fs')

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

(async () => {
  const rawSourceMap = JSON.parse( await readSourceMap('./sourceMap/app.bundle.js.map'))
  const whatever = await SourceMapConsumer.with(rawSourceMap, null, consumer => {
    
  console.log(consumer.originalPositionFor({
    line: 1,
    column: 4419
  }));
 
});
})()
