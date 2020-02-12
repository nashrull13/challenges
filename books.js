module.exports = function(app) {
  const express = require("express");
  const Mongoose = require("mongoose");

  app.use(express.json());

  const BooksModel = Mongoose.model("books", {
    _id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: [String],
    published_date: { type: Date, default: Date.now },
    pages: {
      type: Number,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    publisher_id: {
      type: String,
      required: true
    }
  });

  app.post("/books", async (request, response) => {
    try {
      var books = new BooksModel(request.body);
      var result = await books.save();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/books", async (request, response) => {
    try {
      var result = await BooksModel.find().exec();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/books/:id", async (request, response) => {
    try {
      var books = await BooksModel.findById(request.params.id).exec();
      response.send(books);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.put("/books/:id", async (request, response) => {
    try {
      var books = await BooksModel.findById(request.params.id).exec();
      books.set(request.body);
      var result = await books.save();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.delete("/books/:id", async (request, response) => {
    try {
      var result = await BooksModel.deleteOne({
        _id: request.params.id
      }).exec();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });
};
