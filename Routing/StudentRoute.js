const express = require('express');
const authToken = require('../middleware/getAuthToken'); 

const StudentScheema = require('../Modals/StudentScheema');

const StudentRouter = express.Router();

StudentRouter.post('/signup',async(request,response)=>{
    try{
        const newStudent = new StudentScheema({
                name:request.body.name,
                email:request.body.email,
                phone:request.body.phone,
                age:request.body.age,
        });       
  


        var createdStudent = await newStudent.save();  
        var token='';
        var data={
            "email": createdStudent.email,
            "name":createdStudent.name,
            "age":createdStudent.age,
            "phone":createdStudent.phone,
            "_id":createdStudent._id,
        }
         
        authToken.genrateAuthToken(createdStudent._id, async(data)=>{
            token = data;
            console.log('------------------data', data)
        })

                    console.log('------------------createdStudent', data)

        var createdSuccess = {
            message:"Signup successfully",
            data:Object.assign(data,{token:token}),
            status:true
        };

       
        

        response.status(201).send(createdSuccess);       
    }catch(error){

        const data = {
            code: error.code,
            message:error.message
        }
        console.log("error==>",data);
        const createdFailed = {
            message:error.code =='11000' ? "email or phone is already exist" :error.message,
            data:[],
            status:false
        };
        response.status(400).send(createdFailed);   
    }
});

StudentRouter.get('/getAllStudents',async(request,response)=>{
    try{       
        const getAllStudents = await StudentScheema.find();
        if(getAllStudents !=null ){           
            const getAllStudentsSuccess = {
                message:"Student listed success", 
                status:true, 
                dataLength:getAllStudents.length,
                data:getAllStudents,
                
            };
    
            response.status(201).send(getAllStudentsSuccess);  
        }else{
            const getAllStudentsFailed = {
                message:"Student listed falied",  
                data:null,             
                status:false
            };
    
    
            response.status(400).send(getAllStudentsFailed); 
        }

             
    }catch(error){
        const getAllStudentsFailed = {
            message:error.message,  
            data:null,             
            status:false
        };


        response.status(400).send(getAllStudentsFailed);   
    }
});
StudentRouter.delete('/deleteStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id);
        const deletedStudent = await StudentScheema.findByIdAndDelete(id);        
        if(!id || deletedStudent === null ){
            const deletedFailed = {
                message:"Student is not exist",  
                data:null,             
                status:false
            };
          return  response.status(400).send(deletedFailed);  
        }else{
            const deletedSuccess = {
                message:"Student deleted successfully.", 
                data:deletedStudent,
                status:true
            };
            response.send(deletedSuccess);  
        }             
    }catch(error){
        const deletedFailed = {
            message:error.message,  
            data:null,             
            status:false
        };
        response.status(500).send(deletedFailed);   
    }
});

StudentRouter.put('/updateStudent/:id',async(request,response)=>{
    try{
        const id  = request.params.id;
        console.log("Postman Data==>",id,request.body);
        const updateStudent = await StudentScheema.findByIdAndUpdate(id,request.body,{
            new: true
        });       
        if(!id || updateStudent === null ){
            const updateFailed = {
                message:"Student not exit.", 
                data:null,
                status:false
            }

          return  response.status(404).send(updateFailed);  
        }else{
            const updateSuccess = {
                message:"Student updated successfully.", 
                data:updateStudent,
                status:true
            }

            response.send(updateSuccess);  
        }             
    }catch(error){
        const updateFailed = {
            message:error.message, 
            data:null,
            status:false
        }
        response.status(500).send(updateFailed);   
    }
});




module.exports = StudentRouter;
