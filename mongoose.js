const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MHAuser")
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(`No connection ${err}`);
})

const logInSchema = new mongoose.Schema({
    fname: { type: String, required: true }, // changed from Firstname
    lname: { type: String, required: true }, // changed from Lasttname
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    passconfirm: { type: String, required: true },
  });
const LogInCollection=new mongoose.model('UserData',logInSchema);
module.exports=LogInCollection;