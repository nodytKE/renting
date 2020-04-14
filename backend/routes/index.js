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

//登录
router.get('/getlogin', (req, res) => {
  let sql = `SELECT * FROM userInfo WHERE userEmail = '${req.query.email}' AND userPassword = '${req.query.password}'`;
  db.query(sql,(err,result) => {
      if(result.length>0){
        res.send({
          data:result,
          msg:'登陆成功',
          status:200
        })
      }else{
        res.send({
          code:0,
          msg:'账号或密码错误'
        })
      }
  })
})

//注册
router.post('/register',(req,res) =>{
  let sql1 = `insert into userInfo(userName,userImg,userEmail,userLocation,userPassword) values('${req.body.name}','${req.body.img}','${req.body.email}','${req.body.location}','${req.body.password}' )`;
  let sql2 = `select * from userInfo where userEmail ='${req.body.email}'`
  db.query(sql2,(err,result) => {
    if(result.length>0){
      res.send({
        code:1,
        msg:'该邮箱已被注册',
      })
    }else{
      db.query(sql1,(err,result) => {
        if(err){
          res.send({
            code:2,
            msg:'注册失败'
          })
        }else{
          res.send({
            status:200,
            msg:'注册成功'
          })
        }
      })
    }
  })
})

//修改用户信息
router.post('/setuser',(req,res) => {
  let sql=`update userInfo set userName='${req.body.name} ', userImg='${req.body.img}', userLocation='${req.body.location}', userEmail='${req.body.email}' where userId='${req.body.id}'`
  db.query(sql,(err,result)=> {
    if(err){
      res.send({
        code:4,
        msg:'修改失败'
      })
    }else{
      res.send({
        status:200,
        data:result,
        msg:'修改成功'
      })
    }
  })
})


// 获取房屋信息

router.get('/getallhouse',(req,res) => {
  let sql = `select * from houseInfo `
  db.query(sql,(err,result) => {
    if(err){
      res.send({
        code:3,
        msg:'查询失败'
      })
    }else{
      res.send({
        status:200,
        data:result
      })
    }
  })
})

// 修改房屋信息
router.post('/sethouse',(req,res) => {
  let sql = `update houseInfo set house_name='${req.body.name}', house_price='${req.body.price}', house_balcony='${req.body.balcony}',house_toilet ='${req.body.toilet}', house_subway='${req.body.subway}', house_area='${req.body.area}', house_position='${req.body.position}', house_type='${req.body.type}', house_location='${req.body.location}', house_floor='${req.body.floor}', house_elevator='${req.body.elevator}', house_buildYear = '${req.body.buildYear}' , house_lock ='${req.body.lock}' where house_id='${req.body.id}' `
  db.query(sql,(err,result)=> {
    if(err){
      res.send({
        code:5,
        err:err,
        msg:'修改失败'
      })
    }else{
      res.send({
        status:200,
        msg:'修改成功'
      })
    }
  })
})

// 点击收藏之后
router.post('/collect',(req,res) => {
  let sql1 = `select house_id from userCollect where house_id = ' ${req.body.houseId}' and user_id = '${req.body.userId}'`
  let sql2 = ` insert into userCollect(user_id,house_id) values('${req.body.userId}','${req.body.houseId}' )`
 db.query(sql1,(err,result) => {
   if(result.length>0){
     res.send('已在收藏列表中')
   }else{
    db.query(sql2,(err,result)=>{
      if(err){
        res.send({
          code:6,
          msg:'收藏失败',
          err:err
        })
      }else{
        res.send({
          status:200,
          msg:'收藏成功'
        })
      }
    })
   }
 })
})

// 查询收藏
router.get('/getcollect',(req,res) => {
  // let sql = `select * from houseInfo where house_id in (select house_id from userCollect where user_id = '${req.query.userId}')`
  let sql = `select * from houseInfo join userCollect on houseInfo.house_id = userCollect.house_id where userCollect.user_id= '${req.query.userId}'`
  db.query(sql,(err,result) => {
    if(err){
      res.send({
        code:7,
        msg:'查询失败'
      })
    }else {
      res.send({
        status:200,
        data:result
      })
    }
  })
})

// 上架
router.post('/putaway',(req,res) => {
  let sql1 = `insert into ownerHouse(user_id,house_id) values('${req.body.userId}','${req.body.houseId}')`
  let sql2 = `select house_name from houseInfo where house_name = '${req.body.houseName}'`
  let sql3 = ` insert into houseInfo (house_name,house_price,house_balcony,house_toilet,house_subway,house_area,house_position,house_type,house_location,house_floor,house_elevator,house_buildYear,house_lock) values('${req.body.name}', '${req.body.price}', '${req.body.balcony}', '${req.body.toilet}', '${req.body.subway}', '${req.body.area}', '${req.body.position}', '${req.body.type}', '${req.body.location}', '${req.body.floor}', '${req.body.elevator}', '${req.body.buildYear}','${req.body.lock}')`
  db.query(sql2,(err,result) => {
    if(result.length>0){
      res.send({
        code:8,
        msg:'该处房源已经上架了，无需再次上架',
      })
    }else{
      db.query(sql1,(err,result) => {
        if(result){
          db.query(sql3,(err,result) => {
            res.send({
              status:200,
              msg:'上架成功'
            })
          })
        }
      })
    }
  })
})

// 下架
router.post('/stopsell',(req,res) => {
  let sql1=` delete from ownerHouse where house_id ='${req.body.housId}'`
  let sql2 = `delete from houseInfo where house_id = '${req.body.houseId}'`
  db.query(sql1,(err,result)=>{
    if(result){
      db.query(sql2,(err,result)=>{
        if(result){
          res.send({
            status:200,
            msg:'Done'
          })
        }
      })
    }
  })
})

module.exports = router;
