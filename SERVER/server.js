import express from 'express';
import mongoose from './db/mongoose';
import userRoutes from './routes/user-routes';
import protectedRoute from './routes/protected';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res)=>{
//     res.send('Welcome');
// })

app.use('/user', userRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`listening on Port ${PORT}`));