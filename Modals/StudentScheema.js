const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
// console.log("jsonwebtoken Data==>",jwt);

const studentScheema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
        minlength:5,
	},
	email:{
        type:String,
        required:true,
        // unique:[true,"Email is already exist."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,        
        // unique:[true,"Phone is already exist."],
        min:10,
    },
    age:{
        type:Number,
        required:true,        
        min:3,
       },
    // token:{
    //     type:String,
    //     required:true,
    // }
	
});


// genrating token
// module.export = function genrateAuthToken(request, callBack){
//     try{
//         const token = jwt.sign({ _id:this._id},"mynameispankajtomarandhowareyou");
//         callBack(token);
//     }catch(error){
//         console.log("token Genrated Error==>",error);
//         res.send("token Genrated Error==>",error,message)

//     }
// }
// studentScheema.method().genrateAuthToken = async function(){
    // try{
    //     console.log("token id==>",studentScheema.method);
    //     const token = jwt.sign({ _id:this._id},"mynameispankajtomarandhowareyou");
    //     console.log("token Genrated==>",token);

    // }catch(error){
    //     console.log("token Genrated Error==>",error);
    //     res.send("token Genrated Error==>",error,message)

    // }

// }

// we will create a new collection

const StudentScheema= new mongoose.model("Student",studentScheema);

module.exports = StudentScheema;