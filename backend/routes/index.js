var express = require('express');
var router = express.Router();
var app = express()
var multer = require('multer')
const db = require('./db/connect')
var multiparty = require("multiparty");
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    var filename = new Date().getTime();
    cb(null, filename + "." + fileFormat[fileFormat.length - 1])
  }
});

var upload = multer({ storage: storage })

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//登录
router.get('/getlogin', (req, res) => {
  let sql = `SELECT * FROM userInfo WHERE user_email = '${req.query.email}' AND user_password = '${req.query.password}'`;
  db.query(sql, (err, result) => {
    if (result.length > 0) {
      res.send({
        data: result,
        msg: '登陆成功',
        status: 200
      })
    } else {
      res.send({
        code: 0,
        msg: '账号或密码错误',
        data: {
          code: 103
        }
      })
    }
  })
})

// 通过id查询用户

router.get('/getuserinfo', (req, res) => {
  let sql = `select * from userInfo where user_id = '${req.query.id}'`;
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        data: result
      })
    }
  })
})

//注册
router.post('/register', (req, res) => {
  let sql1 = `insert into userInfo(user_name,user_email,user_password,user_tel) values('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.tel}' )`;
  let sql2 = `select * from userInfo where user_email ='${req.body.email}'`
  if (req.body.name === '' || req.body.password === '') {
    res.send({
      code: 102,
      msg: '用户名和密码不能为空'
    })
  } else if (req.body.email.indexOf('@') === -1) {
    console.log(req.body.email.indexOf(''))
    res.send({
      code: 101,
      msg: '邮箱格式不正确'
    })
  } else if (req.body.password !== req.body.password2) {
    res.send({
      code: 103
    })
  } else {
    db.query(sql2, (err, result) => {
      if (result.length > 0) {
        res.send({
          code: 1,
          msg: '该邮箱已被注册',
        })
      } else {
        db.query(sql1, (err, result) => {
          if (err) {
            res.send({
              code: 2,
              msg: '注册失败'
            })
          } else {
            res.send({
              status: 200,
              msg: '注册成功'
            })
          }
        })
      }
    })
  }

})

//修改用户信息
router.post('/setuser', (req, res) => {
  console.log(req.body)
  let sql = `update userInfo set user_name='${req.body.name} ', user_img='${req.body.img}', user_location='${req.body.location}', user_email='${req.body.email}' where user_id='${req.body.id}'`
  db.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 4,
        msg: '修改失败'
      })
    } else {
      res.send({
        status: 200,
        data: result,
        msg: '修改成功'
      })
    }
  })
})

// 设置用户成为房东
// router.post('/becomeOwner',(req,res)=> {
//   let sql = `update userInfo set user_tel ='${req.body.userTel}',isOwner='${req.body.isOwner}' where user_id='${req.body.id}' `
//   db.query(sql,(err,result) => {
//     if(result){
//       res.send({
//         status:200,
//         data:result,
//         msg:'添加成功'
//       })
//     }
//   })
// })

// 获取房屋信息
router.get('/getallhouse', (req, res) => {
  let sql = `select * from houseInfo `
  db.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 3,
        msg: '查询失败'
      })
    } else {
      res.send({
        status: 200,
        data: result
      })
    }
  })
})

// 根据房屋id查询房屋信息
router.get('/gethousedetail', (req, res) => {
  let sql = `select * from houseInfo where house_id = '${req.query.id}'`
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        data: result
      })
    }
  })
})

// 修改房屋信息
router.post('/sethouse', (req, res) => {
  let sql = `update houseInfo set house_name='${req.body.houseName}', house_price='${req.body.price}', house_balcony='${req.body.balcony}',house_toilet ='${req.body.toilet}', house_subway='${req.body.subway}', house_area='${req.body.area}', house_position='${req.body.position}', house_type='${req.body.type}', house_location='${req.body.location}', house_floor='${req.body.floor}', house_elevator='${req.body.elevator}', house_buildYear = '${req.body.buildYear}' , house_lock ='${req.body.lock}',house_description='${req.body.description}' where house_id='${req.body.id}' `
  db.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 5,
        err: err,
        msg: '修改失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '修改成功',
        data: result
      })
    }
  })
})

// 修改房屋信息时修改图片

// 修改房屋图片
router.post('/setimg', upload.any(), (req, res) => {
  let img0 = ''
  let img1 = ''
  let img2 = ''
  let img3 = ''
  console.log(req)
  if (req.files[0]) {
    img0 = req.files[0].filename
  } else {
    img0 = null
  }
  if (req.files[1]) {
    img1 = req.files[1].filename
  } else {
    img1 = null
  }
  if (req.files[2]) {
    img2 = req.files[2].filename
  } else {
    img2 = null
  }
  if (req.files[3]) {
    img3 = req.files[3].filename
  } else {
    img3 = null
  }
  let sql1 = `insert into ownerHouse(user_id,house_id) values('${req.body.userId}',(select house_id from houseInfo where house_name = '${req.body.houseName}'))`
  let sql2 = `select house_name from houseInfo where house_name = '${req.body.houseName}'`
  let sql3 = ` insert into houseInfo (house_name,house_price,house_balcony,house_toilet,house_subway,house_area,house_position,house_type,house_location,house_floor,house_elevator,house_buildYear,house_lock,house_description,house_img0,house_img1,house_img2,house_img3) values('${req.body.houseName}', '${req.body.price}', '${req.body.balcony}', '${req.body.toilet}', '${req.body.subway}', '${req.body.area}', '${req.body.position}', '${req.body.type}', '${req.body.location}', '${req.body.floor}', '${req.body.elevator}', '${req.body.buildYear}','${req.body.lock}','${req.body.description}','${img0}','${img1}','${img2}','${img3}')`
  db.query(sql2, (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 8,
        msg: '该处房源已经上架了，无需再次上架',
      })
    } else {
      db.query(sql3, (err, result) => {
        if (result) {
          db.query(sql1, (err, result) => {
            if (result) {
              res.send({
                status: 200,
                msg: '上架成功'
              })
            } else {
              res.send(err)
            }
          })
        } else {
          res.send(err)
        }
      })
    }
  })
})

//两种方法
// router.post('/setimg',(req,res)=>{
//   var form = new multiparty.Form({ uploadDir: './public/images' });
//   form.parse(req, function(err, fields, files) {
//     console.log( files)
//     if (err) {
//       res.send(err)
//     } else {
//       res.send({
//         status:200
//       })
//     }
// });
// })

// 点击收藏之后
router.post('/collect', (req, res) => {
  let sql1 = `select house_id from userCollect where house_id = ' ${req.body.houseId}' and user_id = '${req.body.userId}'`
  let sql2 = ` insert into userCollect(user_id,house_id) values('${req.body.userId}','${req.body.houseId}' )`
  db.query(sql1, (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 7,
        msg: '已在收藏列表中',
      })
    } else {
      db.query(sql2, (err, result) => {
        if (err) {
          res.send({
            code: 6,
            msg: '收藏失败',
            err: err
          })
        } else {
          res.send({
            status: 200,
            msg: '收藏成功'
          })
        }
      })
    }
  })
})

// 查询收藏
router.get('/getcollect', (req, res) => {
  // let sql = `select * from houseInfo where house_id in (select house_id from userCollect where user_id = '${req.query.userId}')`
  let sql = `select * from houseInfo join userCollect on houseInfo.house_id = userCollect.house_id where userCollect.user_id= '${req.query.id}'`
  db.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 7,
        msg: '查询失败'
      })
    } else {
      res.send({
        status: 200,
        data: result
      })
    }
  })
})

// 取消收藏
router.post('/canceltag', (req, res) => {
  let sql = `delete from userCollect where house_id = '${req.body.houseId}' and user_id = '${req.body.userId}'`
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        status: 200,
        msg: 'done',
      })
    } else {
      res.send(err)
    }
  })
})

// 上架
router.post('/putaway', upload.any(), (req, res) => {
  let sql1 = `insert into ownerHouse(user_id,house_id) values('${req.body.userId}',(select house_id from houseInfo where house_name = '${req.body.houseName}'))`
  let sql2 = `select house_name from houseInfo where house_name = '${req.body.houseName}'`
  let sql3 = ` insert into houseInfo (house_name,house_price,house_balcony,house_toilet,house_subway,house_area,house_position,house_type,house_location,house_floor,house_elevator,house_buildYear,house_lock,house_description,house_img0,house_img1,house_img2,house_img3) values('${req.body.houseName}', '${req.body.price}', '${req.body.balcony}', '${req.body.toilet}', '${req.body.subway}', '${req.body.area}', '${req.body.position}', '${req.body.type}', '${req.body.location}', '${req.body.floor}', '${req.body.elevator}', '${req.body.buildYear}','${req.body.lock}','${req.body.description}','${req.files[0].path}? ${req.files[0].path} : null','${req.files[1].path}? ${req.files[1].path} : null','${req.files[2].path}? ${req.files[2].path} : null','${req.files[3].path}? ${req.files[3].path} : null')`
  db.query(sql2, (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 8,
        msg: '该处房源已经上架了，无需再次上架',
      })
    } else {
      db.query(sql3, (err, result) => {
        if (result) {
          db.query(sql1, (err, result) => {
            if (result) {
              res.send({
                status: 200,
                msg: '上架成功'
              })
            } else {
              res.send(err)
            }
          })
        } else {
          res.send(err)
        }
      })
    }
  })
})


// 下架
router.post('/stopsell', (req, res) => {
  let sql1 = ` delete from ownerHouse where house_id ='${req.body.houseId}'`
  let sql2 = `delete from houseInfo where house_id = '${req.body.houseId}'`
  db.query(sql1, (err, result) => {
    if (result) {
      db.query(sql2, (err, result) => {
        if (result) {
          res.send({
            status: 200,
            msg: 'Done'
          })
        }
      })
    }
  })
})

// 根据某个房源id查看房东旗下房源
router.get('/getsomehouse', (req, res) => {
  let sql = ` select * from houseInfo where house_id in (select house_id from ownerHouse where user_id =(select user_id from ownerHouse where house_id = '${req.query.id}'))`
  db.query(sql, (err, result) => {
    if (result) {
      res.send(
        { data: result }
      )
    }
  })
})

// 根据房东id查看其下房源
router.get('/gethousebyownerid', (req, res) => {
  let sql = `select * from houseInfo join ownerHouse on houseInfo.house_id = ownerHouse.house_id where ownerHouse.user_id = '${req.query.id}'`
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        data: result,
        status: 200
      })
    }
  })
})

//根据某个房源获取房东的信息
router.get('/getownerinfo', (req, res) => {
  let sql = `select * from userInfo where user_id = (select user_id from ownerHouse where house_id = '${req.query.id}')`
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        data: result
      })
    }
  })
})





// 图像上传
router.post('/admin/uploadhome', upload.single('avatar'), (req, res) => {
  let sql = `update userInfo set user_img = "${req.file.filename}" where user_id = '${req.query.id}'`
  db.query(sql, (err, result) => {
    if (result) {
      res.send({
        status: 200,
        msg: '上传成功'
      })
    }
  })
})


// 找回邮箱密码
router.post('/sendemail', (req, res) => {
  let sql = `select user_password from userInfo where user_email = '${req.body.email}' and user_tel = '${req.body.tel}'`
  db.query(sql, (err, result) => {
    if(result){
      if(result.length > 0) {
        res.send({
          code:1101,
          msg:'发送成功'
        })
        var email = nodemailer.createTransport({

          host: 'smtp.qq.com',//QQ邮箱的服务器
      
          port: 465,      //端口号
      
          secure: true, //465为true,其他为false
      
          auth: {
      
            user: '2282215093@qq.com', // 自己的邮箱
      
            pass: 'ugelbsemhycfeabg'// 授权码
      
          }
      
        });
        var msg = {
      
          from: '2282215093@qq.com', // 收件人显示的发件人信息
      
          to: req.body.email, // 目标邮箱号
      
          subject: '您的密码',
      
          text: result[0].user_password // 发送的内容
      
        };
    
        email.sendMail(msg, function (err, data) {
          console.log(msg)
          if(err){
            res.send(err)
          }else {
             res.send({ error: 0, code: 1101 });    //发送完毕后返回
          }
          email.close();      //发送完毕后关闭
      
        })
      } else {
        res.send ({
          code:1012,
          msg:'邮箱或号码不存在'
        })
      }
    }else{
      console.log(err)
      res.send(err)
    }
    
  })

 

})


module.exports = router;
