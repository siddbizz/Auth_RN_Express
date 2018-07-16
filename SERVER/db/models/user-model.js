import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const User = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        validate: {
            validator:validator.isEmail,
            message: "{VALUE} is not a valid email !"
        }
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true
    }
})

User.pre('save', function(next){
    let user = this;

    if(!user.isModified('password'))
        return next();
    
    bcrypt.genSalt(12, (err, salt)=>{
        if(err)
            return Promise.reject(err);
        
        bcrypt.hash(user.password, salt, (err, hashedPassword)=>{
            if(err)
                return Promise.reject(err);
                
            user.password = hashedPassword;
            next();
        });
    });
})

export default mongoose.model('User', User);