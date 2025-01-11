import mongoose from "mongoose";

export const connectToDb = async ()=>{
    if(mongoose.connections[0].readyState){
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('connect To Db Successfully🤖✅');
            
        })
    } catch (error) {
        console.log('error sth goes wrong connecting to db => ' , error);
        process.exit(1)
    }
}