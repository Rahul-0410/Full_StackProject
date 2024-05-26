const express = require('express')

const path=require('path');

const http=require('http')

const app = express()


var bodyParser=require("body-parser");
 var LogInCollection=require('./mongoose')

 const soc = require('socket.io');


app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

const server=app.listen(port, () => {
  console.log(`Example app listening on port 3000`)
})


app.get('/', (req, res) => {

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

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname,'chat.html'))
})
// chat js code 
const io = soc(server);
io.on('connection', (socket) => {
  // senderName is declared here, within the scope of the connection handler function
  console.log("A user connected");
  var senderName; // Using a normal var declaration

  socket.on('name msg', (msg) => {
      io.emit('name chat', msg);
  });

  socket.on('chat message', (name, msg) => {
      // Within this function scope, senderName refers to the variable declared above
      senderName = name; // Store sender's name in the var
      io.emit('chat', name, msg);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
      console.log("A user disconnected");
      // Emit the disconnect event with the stored name
      io.emit('user disconnected', senderName);
  });
});


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
    // res.redirect("/");
    const user = await LogInCollection.findOne({ fname: newUser.fname });
    const username=user.fname;
    res.redirect(`/?success=true&username=${encodeURIComponent(username)}`);
    // res.redirect(`/?success=true`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

var log=false;
app.post('/sign-in', async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ email: req.body.email });
    if (!check || check.pass !== req.body.pass) {
      res.status(401).send("Invalid email or password");
      return;
    }
  
    const user = await LogInCollection.findOne({ fname: check.fname });
    const username=user.fname;
    // res.redirect(`/?login=true`);
    log=true;
    res.redirect(`/?login=true&username=${encodeURIComponent(username)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.get('/blog',(req,res)=>{
  if(log==true){
    res.redirect('http://127.0.0.1:300/')
    // res.redirect('https://blogweb-8lyb.onrender.com/')
  } else{
    res.redirect(`/sign-in`);
  }
})

// const hostname='0.0.0.0'

// app.listen(process.env.PORT || 3000,hostname, () => {
//   console.log(`Example app listening on port 3000`)
// })