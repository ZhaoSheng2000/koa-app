const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const passport = require('koa-passport');


//实例化koa
const app = new Koa();
const router = new Router();

app.use(bodyParser());


app.use(passport.initialize());
app.use(passport.session());
//回调到config文件中passport.js
require('./config/passport')(passport);

//引入users.js
const users = require('./routes/api/users');
const timeline = require('./routes/api/timeline')

//路由
router.get("/",async ctx => {
    ctx.body = {msg: "Hello Koa Interfaces"};
    console.log()
});

//config
const db = require("./config/keys").mongoURI;

//连接数据库
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true  })
    .then(() =>{
        console.log("MongoDB connectd successful......")
    })
    .catch(err=>{
        console.log(err)
});

//配置路由地址:local:5000/api/users ===>users
router.use('/api/users',users);
router.use('/api/timeline',timeline)


//配置路由
app.use(router.routes()).use(router.allowedMethods());

const port =  process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});