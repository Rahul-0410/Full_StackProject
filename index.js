const express = require('express')

const path=require('path');

const http=require('http')

const app = express()
const server = http.createServer(app);

var bodyParser=require("body-parser");
 var LogInCollection=require('./mongoose')

 const {intitializesSocket}=require('./chat');

app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/index', (req, res) => {
 
  res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/help-others', (req, res) => {
    
  res.sendFile(path.join(__dirname,'help-others.html'));
})
app.get('/educate-yourself', (req, res) => {
    
  res.sendFile(path.join(__dirname,'educate-yourself.html'))
})
app.get('/help-yourself', (req, res) => {
    
  res.sendFile(path.join(__dirname,'help-yourself.html'));
})
app.get('/sign-in', (req, res) => {
    

  res.sendFile(path.join(__dirname,'sign-in.html'))
})
app.get('/sign-up', (req, res) => {
    
  res.sendFile(path.join(__dirname,'sign-up.html'))
})
app.get('/spread-the-word', (req, res) => {
    
  res.sendFile(path.join(__dirname,'spread-the-word.html'))
})

// app.get('/chat', (req, res) => {
//   res.sendFile(path.join(__dirname,'chat.html'))
//   intitializesSocket(server);
// })

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
    res.status(201).sendFile(path.join(__dirname,'index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// const hostname='0.0.0.0'
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port 3000`)
})
// app.listen(process.env.PORT || 3000,hostname, () => {
//   console.log(`Example app listening on port 3000`)
// })