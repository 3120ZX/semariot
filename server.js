const express = require('express')
const app = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log('Starting server')

app.get('/', (req,res)=>{
    res.render('hello.html')
    console.log('req received')
})

app.listen(8000)