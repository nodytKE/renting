var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('*', (req, res, next) => {
  // 先设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许携带的请求头
  // 给其他路由放行
  next();
})

router.get('/getlogin',(req,res) => {
  console.log(11111)
  res.send('没有cuo')
})

module.exports = router;
