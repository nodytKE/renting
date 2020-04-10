// 引入模块
var express = require('express');
const mysql = require('mysql')

// 创建连接对象
const db = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user: 'root',
  password: 'root',
  database: 'renting'
})

// 连接
db.connect(function(err){
  if(err){
    console.log("连接失败")
  }else {
    console.log('连接成功')
  }
})

module.exports = db;  