const dotenv = require("dotenv")
dotenv.config()
const app = require("./src/app");



let PORT = process.env.PORT
app.httpServer.listen(8000,()=>{
    console.log(`Server is running on port ${PORT}`)
})