import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import userRouts from './apis/users.js'
import postRoutes from './apis/posts.js'
import miscRoutes from './apis/misc.js'
import questionRoutes from './apis/questions.js'
import { getAllItemsFromCollection } from './utilities/mongo-wrapper.js'

dotenv.config('.env')

const app = express();
app.use(express.json()) // enable the json
app.use(express.static('public')); // enable access to files from the server from "public" folder
app.use(cors()) // enable our server to receive requests from any front end 


const authenticator = async (req, res, next) => {

    try {
        var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        next()
    } catch (error) {
        return res.status(403).send("Invalid.")
    }
}

app.use('/', userRouts)
app.use('/', postRoutes)
app.use('/', miscRoutes)
app.use('/', questionRoutes)


app.listen(process.env.PORT, () => {
    console.log(process.env.MESSAGE + ' On Port ' + process.env.PORT)
})
