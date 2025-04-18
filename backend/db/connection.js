import mongoose from 'mongoose'

const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully!");
    }catch(err){
        console.log("Error while connecting to DB: ",err);
    }
}
export default connection;