const dotenv = require("dotenv")
const { httpServer } = require("./src/app")
dotenv.config()
// const app = require("./src/app");



let PORT = process.env.PORT
httpServer.listen(8000,()=>{
    console.log(`Server is running on port ${PORT}`)
})