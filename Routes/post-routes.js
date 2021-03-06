// This helps us so we can use other routes.
var path = require("path");

module.exports = function (app) {
  // Homepage route
  app.get("/", function (req, res) {
    res.render("index");
  });

  //  A route for all the posts
  app.get("/api/posts", function (req, res) {
    var query = {};
    if (req.query.clubSocial_id) {
      query.clubSocialID = req.query.clubSocial_id;
    }

    db.Post.findAll({
      where: query,
      include: [db.clubSocial_db],
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.clubSocial],
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  // made a way to update routes
  app.put("/api/posts", function (req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
};
