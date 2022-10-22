
import { Router } from 'express';
import fs from 'fs'


const userRoutes = Router();

userRoutes.get('/authenticate', (req, res) => {


    let users = JSON.parse(fs.readFileSync('./data/users.json'))

    const isAuthenticated = users.some(x =>
        x.username == req.query.username
        && x.password == req.query.password)

    let responseObj = {
        result: isAuthenticated
    }

    return res.json(responseObj)

})

userRoutes.post('/create-new-user', (req, res) => {

    //added entry in users array

    let users = JSON.parse(fs.readFileSync('./data/users.json'))

    const isPresent = users.some(x => x.username == req.body.username)

    if (isPresent == true) {

        return res.json({
            result: false
        })

    } else {
        let obj = req.body

        users.push(obj)
        fs.writeFileSync('./data/users.json', JSON.stringify(users))

        return res.json({
            result: true
        })
    }
})


export default userRoutes;