const { where } = require("sequelize");
const { Book } = require("../models");

const addBook = async (req, res) => {
  const { title, author, genre, publicationYear } = req.body;

  try {
    if (!title || !author || !genre || !publicationYear) {
      return res.status(401).json({ message: "Please enter all the details" });
    }

    const book = await Book.findOne({ where: { title } });

    if (book) {
      return res
        .status(400)
        .json({ message: "Book already exist", book: book });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      publicationYear,
    });

    res.status(200).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const searchBooks = async (req, res) => {
  const title = req.query.title;
  const author = req.query.author;

  try {
    if (!title || !author) {
      return res
        .status(401)
        .json({ message: "Plesae provide the title and author" });
    }

    const book = await Book.findOne({ where: { title, author } });
    if (!book) {
      return res.status(400).json({ message: "No books found" });
    }

    res.status(200).json({ books: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, genre } = req.body;

  try {
    if (!bookId) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.update(
      {
        title,
        genre,
      },
      { where: { id: bookId } }
    );

    const updatedBook = await Book.findByPk(bookId);

    res.status(200).json({
      message: "Book details updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addBook, searchBooks, updateBook };
