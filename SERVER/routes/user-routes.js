import express from 'express';
import User from '../db/models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mySecret } from '../config';

const router = express.Router();

router.post('/register', (req, res)=>{
    const { email, password, username } = req.body;
    
    let newUser = new User({
        email,
        password,
        username
    });
    
    newUser.save()
        .then(user =>{
            if(!user)
                return res.status(400).send();
            
            return res.status(201).send(user);

        }).catch(err=>{
            if(err)
                return res.status(400).send(err);

            return res.status(400).send();
        })
})

router.post('/login', (req, res)=>{
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if(!user)
                return res.status(401).send();
            
            bcrypt.compare(password, user.password).then(isMatch =>{
                if(!isMatch)
                    return res.status(401).send(); 
                    
                let token = jwt.sign({_id: user._id}, mySecret);
                return res.status(201)
                            .header('x-auth', token)
                            .send("Authenticated!");

            }).catch(err=>{
                res.status(401).send({error: err})
            })
        }).catch(err => {
            if(err)
                return res.status(401).send(err);
            return res.status(401).send(err);
        })
})

export default router;