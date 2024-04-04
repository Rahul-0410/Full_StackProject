const express = require('express')
const path=require('path');
const app = express()
app.set('view engine','ejs');
// app.use('/static',express.static('static'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
 
  res.render("index");
})
app.get('/index', (req, res) => {
 
  res.render("index");
})
app.get('/help-others', (req, res) => {
    
  res.render("help-others");
 
})
app.get('/educate-yourself', (req, res) => {
    
  res.render("educate-yourself");
 
})
app.get('/help-yourself', (req, res) => {
    
  res.render("help-yourself");
 
})
app.get('/sign-in', (req, res) => {
    
  res.render("sign-in");
 
})
app.get('/sign-up', (req, res) => {
    
  res.render("sign-up");
 
})
app.get('/spread-the-word', (req, res) => {
    
  res.render("spread-the-word");
 
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})