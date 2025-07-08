const express = require("express");
const cors = require("cors");
const { addUser } = require("./controller/user");
const { addBook, searchBooks, updateBook } = require("./controller/book");
const {
  addToReadingList,
  getUserByReadingList,
  removeBookFromReadingList,
} = require("./controller/readingList");

const app = express();

app.use(cors());
app.use(express.json());

//book
app.post("/api/books", addBook);
app.get("/api/books/search", searchBooks);
app.post("/api/books/:bookId", updateBook);

//readingList
app.post("/api/reading-list", addToReadingList);
app.get("/api/reading-list/:userId", getUserByReadingList);
app.post("/api/reading-list/:readingListId", removeBookFromReadingList);

//user
app.post("/api/users", addUser);

module.exports = app;
