import { Router } from "express";
import fs from "fs";
import { ObjectId } from "mongodb";
import {
  getPagedItemsFromCollection,
  getAllItemsFromCollection,
  getSingleItemFromCollection,
  saveItemInCollection,
  updateItemFromCollection,
} from "../utilities/mongo-wrapper.js";

const postRoutes = Router();

// get all
postRoutes.get("/posts", async (req, res) => {
  let pageNumber = req.query.page;

  let postsList = await getPagedItemsFromCollection("posts", pageNumber, {});
  return res.json(postsList);
});

//get single
postRoutes.get("/posts/:id", async (req, res) => {
  let id = req.params.id;

  let postsList = await getAllItemsFromCollection("posts", {
    _id: ObjectId(id),
  });

  return res.json(postsList[0]);
});

//create
postRoutes.post("/posts", async (req, res) => {
  let obj = req.body;

  obj["likes"] = 0;
  obj["commentsCount"] = 0;

  await saveItemInCollection("posts", obj);

  return res.json({
    result: true,
  });
});

postRoutes.delete("/posts", (req, res) => {
  //delete login

  return res.json({
    result: true,
  });
});

postRoutes.put("/posts", (req, res) => {
  return res.json({
    result: true,
  });
});

//likes
// postRoutes.patch("/posts/:id/like", async (req, res) => {
//   let id = req.params.id;
//   let username = req.body.username;
//   //get item from database
//   let post = await getSingleItemFromCollection("posts", { _id: ObjectId(id) });

//   //checking if found
//   if (post) {
//     if (!post.likedUsers.some((x) => x == username)) {
//       //update likes on server
//       post.likedUsers.push(username);
//       post.likes = post.likedUsers.length;

//       //update likes on database
//       await updateItemFromCollection("posts", { _id: ObjectId(id) }, post);
//       //done
//       return res.json({
//         result: true,
//         newLikes: post.likes,
//       });
//     } else {
//       return res.json({
//         result: true,
//         newLikes: post.likes,
//       });
//     }
//   }

//   return res.json({
//     result: false,
//   });
// });

//getting all the comments for the post
postRoutes.get("/posts/:id/comments", async (req, res) => {
  let newComments = await getAllItemsFromCollection("comments", {
    postId: req.params.id,
  });

  return res.json({
    result: true,
    newComments: newComments,
  });
});

//likes
postRoutes.post("/posts/:id/comments", async (req, res) => {
  let obj = req.body;
  obj["postId"] = req.params.id;

  await saveItemInCollection("comments", obj);

  let newComments = await getAllItemsFromCollection("comments", {
    postId: req.params.id,
  });

  //Update the comment count in post object?
  await updateItemFromCollection(
    "posts",
    { _id: ObjectId(req.params.id) },
    { commentsCount: newComments.length }
  );

  return res.json({
    result: true,
    newComments: newComments,
  });
});



postRoutes.get("/posts/:id/likes", async (req, res) => {
  let likes = await getAllItemsFromCollection("likes", {
    postId: req.params.id,
  });

  return res.json({
    result: true,
    likes: likes,
  });
});

postRoutes.post("/posts/:id/likes", async (req, res) => {
  let obj = req.body;
  obj["postId"] = req.params.id;

  await saveItemInCollection("likes", obj);

  let likes = await getAllItemsFromCollection("likes", {
    postId: req.params.id,
  });

  //Update the comment count in post object?
  await updateItemFromCollection(
    "posts",
    { _id: ObjectId(req.params.id) },
    { likes: likes.length }
  );

  return res.json({
    result: true,
    likes: likes,
  });
})

export default postRoutes;
