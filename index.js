const express = require('express')
const path=require('path');
const app = express()

var bodyParser=require("body-parser");
 var LogInCollection=require('./mongoose')

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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


app.post('/sign-up', async (req, res) => {
  const { fname, lname, email, pass, passconfirm } = req.body;
  const data = {
    fname,
    lname,
    email,
    pass,
    passconfirm,
  };

  try {
    const checking = await LogInCollection.findOne({ email });
    if (checking) {
      res.status(400).send("User details already exist");
      return;
    }
    const newUser = new LogInCollection(data);
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.post('/sign-in', async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ email: req.body.email });
    if (!check || check.pass !== req.body.pass) {
      res.status(401).send("Invalid email or password");
      return;
    }
    res.status(201).render("index");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})