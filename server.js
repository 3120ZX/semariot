const express = require('express')
const app = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req,res)=>{
    res.render('hello.html')
    console.log('kepin')
    
})

app.listen(8000)