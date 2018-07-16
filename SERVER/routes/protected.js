import express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.get('/protected', authenticate, (req, res)=>{
    let obj = {
        message: "This is a secret ROUTE",
        secret: "YOU MAY PASS!!",
        _id: req._id,
        username: req.username
    }

    res.status(200).send(obj);
})

export default router;