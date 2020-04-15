// 引入模块
var express = require('express');
const mysql = require('mysql')

// 创建连接对象
const db = mysql.createConnection({
  host: '49.233.131.99',
  port:3306,
  user: 'renting',
  password: '5346jkPaWkcbXHkL',
  database: 'renting'
})

// 连接
db.connect(function(err){
  if(err){
    console.log(err)
  }else {
    console.log('连接成功')
  }
})

module.exports = db;  