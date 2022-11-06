

import { Router } from 'express';
import fs from 'fs'
import { ObjectId } from 'mongodb';
import { getAllItemsFromCollection, getSingleItemFromCollection, saveItemInCollection, updateItemFromCollection } from '../utilities/mongo-wrapper.js';

const postRoutes = Router();


// get all
postRoutes.get('/posts', async (req, res) => {
    let postsList = await getAllItemsFromCollection("posts", {})
    return res.json(postsList)
})


//get single
postRoutes.get('/posts/:id', async (req, res) => {

    let id = req.params.id;

    let postsList = await getAllItemsFromCollection("posts", { _id: ObjectId(id) })

    return res.json(postsList[0])
})



//create 
postRoutes.post('/posts', async (req, res) => {


    let obj = req.body;

    obj["likes"] = 0;
    obj["likedUsers"] = []
    obj["comments"] = []


    await saveItemInCollection("posts", obj)

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
postRoutes.patch('/posts/:id/like', async (req, res) => {

    let id = req.params.id;
    let username = req.body.username;
    //get item from database
    let post  = await getSingleItemFromCollection('posts', { _id: ObjectId(id) })

    //checking if found
    if (post) {
        if (!post.likedUsers.some(x => x == username)) {
            //update likes on server     
            post.likedUsers.push(username)
            post.likes = post.likedUsers.length;            
            
            //update likes on database
            await updateItemFromCollection("posts", { _id: ObjectId(id) }, post)
            //done
            return res.json({
                result: true,
                newLikes: post.likes
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


