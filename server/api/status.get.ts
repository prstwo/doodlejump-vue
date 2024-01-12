// import mongoose from 'mongoose'

// export default defineEventHandler(() => {
//     mongoose.connect("mongodb://127.0.0.1:27017/doodle");
//     const db = mongoose.connection;
//     db.on('error',(err)=> console.log("err ist:::", err))
//     db.once('open',()=> console.log("connected to db"))
//     console.log("db readystate:", mongoose.connection.readyState)

//     return mongoose.connection.readyState
// })

import mongoose from 'mongoose'

export default defineEventHandler(() => {
    const config = useRuntimeConfig()
    mongoose.connect(config.public.uri);
    // mongoose.connect("mongodb://127.0.0.1:27017/doodle");
    const db = mongoose.connection;
    db.on('error',(err)=> console.log("err ist:::", err))
    db.once('open',()=> console.log("connected to db"))
    return mongoose.connection.readyState
})