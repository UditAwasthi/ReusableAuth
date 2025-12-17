// Imports
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
// Env config
dotenv.config({
    path: "./.env",

})

const port = process.env.PORT || 3001;


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })

    })
    .catch((err) => {
        console.error("MongoDb connection error", error)
        process.exit(1)
    })

