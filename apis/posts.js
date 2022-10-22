

import { Router } from 'express';
import fs from 'fs'
import { generateUUID } from '../utilities/utilities.js'

const postRoutes = Router();


// get all
postRoutes.get('/posts', (req, res) => {
    let postsList = JSON.parse(fs.readFileSync('./data/posts.json'))
    return res.json(postsList)
})


//get single
postRoutes.get('/posts/:id', (req, res) => {

    let id = req.params.id;

    let postsList = JSON.parse(fs.readFileSync('./data/posts.json'))

    let post = postsList.find(x => x.id == id)

    return res.json(post)
})



//create 
postRoutes.post('/posts', (req, res) => {

    //added entry in users array

    let postsList = JSON.parse(fs.readFileSync('./data/posts.json'))

    let obj = req.body;

    obj["id"] = generateUUID()
    obj["likes"] = 0;
    obj["likedUsers"] = []
    obj["comments"] = []


    postsList.push(obj)
    fs.writeFileSync('./data/posts.json', JSON.stringify(postsList))

    return res.json({
        result: true
    })
})



postRoutes.delete('/posts', (req, res) => {

    //delete login

    return res.json({
        result: true
    })
})




postRoutes.put('/posts', (req, res) => {

    return res.json({
        result: true
    })
})



//likes
postRoutes.patch('/posts/:id/like', (req, res) => {

    let id = req.params.id;
    let username = req.body.username;
    //get item from database
    let postsList = JSON.parse(fs.readFileSync('./data/posts.json'))
    let index = postsList.findIndex(x => x.id == id)

    //checking if found
    if (index > -1) {

        let post = postsList[index];

        if (!post.likedUsers.some(x => x == username)) {

            //update likes        
            postsList[index].likedUsers.push(username)
            postsList[index].likes = postsList[index].likedUsers.length;
            //save the file
            fs.writeFileSync('./data/posts.json', JSON.stringify(postsList))
            //done
            return res.json({
                result: true,
                newLikes: postsList[index].likes
            })
        } else {
            return res.json({
                result: true,
                newLikes: post.likes
            })
        }

    }

    return res.json({
        result: false
    })
})





//likes
postRoutes.post('/posts/:id/comments', (req, res) => {

    let id = req.params.id;
    let commentObj = req.body;
    //get item from database
    let postsList = JSON.parse(fs.readFileSync('./data/posts.json'))
    let index = postsList.findIndex(x => x.id == id)

    //checking if found
    if (index > -1) {

        let post = postsList[index];
        post.comments.push(commentObj)

        //save the file
        fs.writeFileSync('./data/posts.json', JSON.stringify(postsList))
        //done
        return res.json({
            result: true,
            newComments: post.comments
        })
    }

    return res.json({
        result: false
    })
})

export default postRoutes;


