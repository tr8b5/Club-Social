const db = require("./models");
const router = require("express").Router();

//Require API routes
router.get("/api/posts", (req, res) => {
    db.Post.findAll().then((allPosts) => {
      console.log(allPosts);
      res.json(allPosts);
    });
  });
  
  router.get("/api/posts/:id", (req, res) => {
    db.Post.findOne({ where: { id: req.params.id } }).then((foundPost) => {
      console.log(foundPost);
      res.json(foundPost);
    });
  });
  
  router.post("/api/posts", (req, res) => {
    db.Post.create({
      school: req.body.school,
      subject: req.body.subject,
      post: req.body.post,
      votes: req.body.votes,
    }).then((newPost) => {
      console.log(newPost);
      res.json(newPost);
    });
  });
  
  router.put("/api/posts/:id", (req, res) => {
    db.Post.update(req.body, {
      where: { id: req.params.id },
    }).then((updatedPost) => {
      console.log(updatedPost);
      res.json(updatedPost);
    });
  });
  
  router.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      console.log("Post deleted.");
      res.end();
    });
  });

  module.exports = router;