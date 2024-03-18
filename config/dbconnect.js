const { default: mongoose } = require("mongoose")

const dbconnect = () =>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully");
    }
    catch (error) {
        console.log("database error");
    }
};
module.exports=dbconnect;