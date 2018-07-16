import mongoose from 'mongoose';
import { dbUserName, dbPassword } from '../config';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${dbUserName}:${dbPassword}@ds221631.mlab.com:21631/authenticate-rn`)
.then(()=>console.log("Db connected"))
.catch(err=>console.log(err));

export default mongoose;