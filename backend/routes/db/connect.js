// 引入模块
const mysql = require('mysql')

// 创建连接对象
const connect = mysql.createConnection({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password: 'qweasd123456',
  database: 'renting'
})

// 连接
connect.connect()
console.log('【数据库已连接...】');

module.exports = connect;