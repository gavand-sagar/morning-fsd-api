

import { Router } from 'express';
import { getAllItemsFromCollection, saveItemInCollection } from '../utilities/mongo-wrapper.js';

const questionRoutes = Router();


// get all
questionRoutes.get('/questions', async (req, res) => {
    let questionsList = await getAllItemsFromCollection("questions", {})
    return res.json(questionsList)
})




questionRoutes.post('/questions', async (req, res) => {


    let obj = req.body;

    await saveItemInCollection("questions", obj)

    return res.json({
        result: true
    })
})


export default questionRoutes;
