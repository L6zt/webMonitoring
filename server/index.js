const koa = require('koa')
const getDb = require('./db.config')
const app = new koa()
app.use(async(ctx) => {
  const {db, close} = await getDb()
  const collection = db.collection('error')
  const data = await new Promise((r, j) => {
    collection.insertMany([
      {docIndex: 1}, {docIndex: 2}, {docIndex: 3}
    ], (err, result) => {
      if (err) throw err
      r(result)
      close()
    })
  })
  ctx.res.setHeader('content-type', 'application/json')
  ctx.body = data
})
app.listen(7000)
