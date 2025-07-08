const { ReadingList } = require("../models");
const { Book } = require("../models");
const { User } = require("../models");

const addToReadingList = async (req, res) => {
  const { userId, bookId, status } = req.body;

  try {
    if (!userId || !bookId || !status) {
      return res.status(401).json({ message: "Please check again" });
    }

    const findUserId = await User.findByPk(userId);

    const findBookId = await Book.findByPk(bookId);

    if (!findUserId || !findBookId) {
      return res.status(404).json({ message: "Invalid userId or bookId" });
    }

    const addStatus = await ReadingList.create({
      userId,
      bookId,
      status,
    });
    return res
      .status(200)
      .json({ message: "Book added to reading list", addStatus });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const getUserByReadingList = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).json("Check your id again!");
    }

    const findReadingList = await ReadingList.findOne({
      where: { userId },
    });
    if (!findReadingList) {
      res
        .status(404)
        .json({ message: "User not found or no books in reading list" });
    }
    res.status(200).json({ readingList: findReadingList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const removeBookFromReadingList = async (req, res) => {
  const { readingListId } = req.params;

  try {
    if (!readingListId) {
      return res.status(404).json({
        message: "Reading list entry not found",
      });
    }

    const removeReadingList = await ReadingList.destroy({
      where: { id: readingListId },
    });
    return res.status(200).json({
      message: "Book removed from reading list",
      removeReadingList: removeReadingList,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

module.exports = {
  addToReadingList,
  getUserByReadingList,
  removeBookFromReadingList,
};
