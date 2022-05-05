const express = require('express')
const app = express()
const path = require('path')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log('Starting server')

var resources = path.join(__dirname+ '/resources')
var styles = path.join(__dirname+ '/styles')
app.use(express.static(resources))
app.use(express.static(styles))

app.get('/', (req,res)=>{
    res.render('hello.html')
    console.log('req received')
})

app.get('/panel', (req, res) => {
	res.render('../views/panel.html')
	console.log('viewing panel')
})

app.get('/phone', (req, res) => {
	res.render('../views/phone.html')
	console.log('viewing phone')
})

app.listen(8000)