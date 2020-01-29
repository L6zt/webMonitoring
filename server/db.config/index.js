const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017'
const dbName = 'monitoring'
// 连接
const connect = (client) => new Promise((r, j) => {
  client.connect((err) => {
    if (err !== null) throw err
    r({
      db: client.db(dbName),
      client
    })
  })
})
// 数据库
const getDb = async () => {
  const client = new MongoClient(dbUrl, { useNewUrlParser: true });
  const {db} = await connect(client)
  return {
    db,
    close: () => client.close()
  }
}
console.log(getDb)
module.exports = getDb
