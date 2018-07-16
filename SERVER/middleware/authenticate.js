import jwt from 'jsonwebtoken';
import User from '../db/models/user-model';
import { mySecret } from '../config';

export default (req, res, next)=>{
    let token = req.header('x-auth');

    try {
        let payload = jwt.verify(token, mySecret);

        User.findById(payload._id)
            .then(user=>{
                if(!user)
                    return res.status(400).send();
                req._id = payload._id;
                req.username = user.username;
                next();
            })
            .catch(err=> res.status(401).send(err));
    } catch (err){
        return res.status(400).send(err);
    }
};