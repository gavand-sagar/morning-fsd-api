import { Router } from 'express';
import fs from 'fs'


const miscRoutes = Router();



let data = ['sagar', 'anshu', 'kaustubh', 'arun', 'abhishekh']


miscRoutes.get('/', (req, res) => {

    let responseObj = {
        message: 'hii'
    }

    res.json(responseObj)
})


miscRoutes.get('/get-user-information', (req, res) => {

    let responseObj = {
        username: 'sagar',
        avatarImageUrl: 'asdkf',
    }

    res.json(responseObj)
})


miscRoutes.get('/get-article', (req, res) => {

    let responseObj = {
        message: 'this is an article'
    }

    res.json(responseObj)
})


miscRoutes.get('/square-of-number', (req, res) => {

    let number = req.query.number;

    let responseObj = {
        number: number,
        square: number * number
    }

    res.json(responseObj)
})





miscRoutes.get('/check-even-odd', (req, res) => {


    let number = req.query.number;

    let responseObj = {
        number: number,
        result: number % 2 == 0 ? "even" : "odd"
    }

    res.json(responseObj)
})



miscRoutes.get('/get-users', (req, res) => {

    let responseObj = {
        users: data
    }

    res.json(responseObj)
})


miscRoutes.get('/users-staring-with', (req, res) => {

    let letter = req.query.letter;

    let result = data.filter((item) => item.startsWith(letter));

    let responseObj = {
        users: data,
        result: result,
    }

    res.json(responseObj)
})







// app.get('/index', (req, res) => {    


//     const content = fs.readFileSync('./inde')


//     console.log(content)

//     res.send(content)

// })


miscRoutes.get('/url-name', (req, res) => {

    res.json(postsList)

})


export default miscRoutes;


