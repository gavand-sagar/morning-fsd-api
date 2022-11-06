import jwt from 'jsonwebtoken'
import { Router } from 'express';
import { getAllItemsFromCollection, saveItemInCollection } from '../utilities/mongo-wrapper.js';
import { encryptString } from '../utilities/utilities.js';


const userRoutes = Router();

userRoutes.get('/authenticate', async (req, res) => {


    const matching = await getAllItemsFromCollection("users",
        { username: req.query.username, password: encryptString(req.query.password) })

    const isAuthenticated = matching && matching.length > 0

    let token = ''
    if (isAuthenticated) {
        token = jwt.sign({
            data: req.query.username
          }, process.env.SECRET_KEY, { expiresIn: '1h' });
    }
    let responseObj = {
        result: isAuthenticated,
        token:token
    }

    return res.json(responseObj)

})

userRoutes.post('/create-new-user', async (req, res) => {

    //added entry in users array

    const matching = await getAllItemsFromCollection("users", { username: req.body.username })

    const isPresent = matching && matching.length > 0

    if (isPresent == true) {

        return res.json({
            result: false
        })

    } else {
        let obj = req.body
        obj.password = encryptString(obj.password)

        await saveItemInCollection("users", obj)

        return res.json({
            result: true
        })
    }
})


export default userRoutes;