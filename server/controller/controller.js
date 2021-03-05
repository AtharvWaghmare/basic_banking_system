var Userdb = require('../model/model');

//Create and save new user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }
    user
    const user = new Userdb({
        name:"Rohan das",
        email:"rohan12@gmail.com",
        balance: 1000
    })
    //save user1 in database
    user.save(user).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
        });
    });


}

//retrive and return all users/retrive and return all users
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message:"Not find user with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Error retriving with id"+id})
        })
    }else{
    Userdb.find()
    .then(user =>{
        res.send(user);
    })
    .catch(err=>{
        res.status(500).send({message: err.message || "Error occured while retriving user information"})
    })
}
}

//Update a new identified user by user id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data =>{
        if(!data){
            res.status(404).send({message:`Cannot update user with ${id}.Maybe user not found`})
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error Update user information"});
    })
}