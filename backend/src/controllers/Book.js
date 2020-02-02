const Book = require("../models/Book");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.send('ji')
});

router.get("/:isbn", (req, res) => {
    // can name i, isbn or anything
    const i = req.params.isbn;
    console.log(i);
    Book.find({ isbn: i })
      .then(book => {
        console.log(book);
        if (book) {
          return res.send(book);
        } else {
          return res.status(404).send({ data: [] });
        }
      })
      .catch(err => {
        return res.status(500).send({ state: "fail" });
      });
  });

  router.post("/", (req, res) => {
    // storing the json body in a variable
    var incomingData = req.body;
    //creating a new Book object
    var a = new Book({
      isbn: incomingData.isbn,
      title: incomingData["title"],
      author: incomingData["author"]
    });
  
    a.save(function(err, book) {
      // if something goes wrong send appropriate message
      if (err) {
        console.log(err);
        res.status(400);
        return res.send({ state: "Fail" });
      }
  
      // if nothing wrong send success
      return res.send({ state: "success" });
    });
  });

  router.put("/:i", (req, res) => {
      Book.update({isbn: req.params.i}, req.body)
        .then(status =>{
            Book.findOne({isbn: req.params.i})
                .then(book =>{
                    res.send(book);
                })
                .catch(err =>{
                    res.status(500).send({state: "fail"});
                });
        })
        .catch(err =>{
            res.status(500).send({state: "fail"});
        });
  });

  router.delete("/:isbn", (req, res) => {
    res.send("upating book " + req.params.isbn);
  });


  module.exports = router;