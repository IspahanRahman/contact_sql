require ("dotenv").config()
const express=require('express')
const morgan=require('morgan')
const router=require('./routes')
const bodyParser = require('body-parser');
const db = require('../contacts_app_sql/config/database')


db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql is connected')
})


const app=express()

app.set('view engine','ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/createDatabase',(req,res)=>{
 let sql='CREATE DATABASE contact'
 db.query(sql,(err,result)=>{
     if(err) throw err

     console.log(result);
     res.send('<div style="background-color:#A29694;color:black;"><h1 align="center">Database Created</h1></div>')
 })
})


app.use('/contacts',router)

app.get('/',(req,res)=>{
    res.send('<div style="background-color:#A29694;color:black;"><h1 align="center">Contact Project with MySQL </h1></div>')

})

app.get('*',(req,res)=>{
    res.send('<div style="background-color:#A29694;color:black;"><h1 align="center">404 not found</h1></div>')
})


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})