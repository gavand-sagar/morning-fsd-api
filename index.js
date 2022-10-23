import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouts from './apis/users.js'
import postRoutes from './apis/posts.js'
import miscRoutes from './apis/misc.js'
import questionRoutes from './apis/questions.js'

dotenv.config('.env')

const app = express();
app.use(express.json()) // enable the json
app.use(express.static('public')); // enable access to files from the server from "public" folder
app.use(cors()) // enable our server to receive requests from any front end 

app.use('/', userRouts)
app.use('/', postRoutes)
app.use('/', miscRoutes)
app.use('/', questionRoutes)


app.listen(process.env.PORT, () => {
    console.log(process.env.MESSAGE + ' On Port ' + process.env.PORT)
})
