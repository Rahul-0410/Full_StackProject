const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rgs786999:8wm6lhVoV59yirSJ@cluster0.9olfp7w.mongodb.net/",{
    dbName: "MHO",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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