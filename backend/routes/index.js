var express = require('express');
var router = express.Router();

var app = express()

const db =require('./db/connect')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin',"*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","Authorization");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true")
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

router.get('/getlogin', (req, res) => {
  db.query(err=>{
    console.log(err)
  })
  console.log(11111)
  res.send('没有cuo')
})

module.exports = router;
