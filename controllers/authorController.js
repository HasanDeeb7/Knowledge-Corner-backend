import mongoose from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";

//get all authors
//@param {Object} request  -  @param {Object} response
//@returns {Object} An array of author objects
//@throws {Error} If there is an error while retrieving authors
export const getAuthors = async (request, response) => {
  const authors = await Author.find({}).sort({ createdAt: -1 });
  response.status(200).json(authors);
};
//get an author
//@returns {Object} The author object with the specified ID
export const getAuthor = async (request, response) => {
  const { id } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "no such author" });
  }
  const author = await Author.findById(id);
  if (!author) {
    return response.status(404).json({ error: "no such author" });
  }
  response.json(author);
};
//create author
//@returns {Object} The created author object.
export const createAuthor = async (request, response) => {
  upload.single("image")(request, response, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const {
      firstName,
      lastName,
      dob,
      nationality,
      biography,
      twitterLink,
      linkedinLink,
      blogLink,
      rating,
    } = request.body;

    // Validate the inputs
    if (!firstName || !lastName || !biography) {
      return response
        .status(400)
        .json({ error: "Required fields are missing" });
    }
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (dob && !dobPattern.test(dob)) {
      return response
        .status(400)
        .json({ error: "Invalid date format" });
    }
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/;
    if (twitterLink && !urlPattern.test(twitterLink)) {
      return response
        .status(400)
        .json({ error: "Invalid twitter link format" });
    }

    if (linkedinLink && !urlPattern.test(linkedinLink)) {
      return response
        .status(400)
        .json({ error: "Invalid LinkedIn link format." });
    }

    if (blogLink && !urlPattern.test(blogLink)) {
      return response
        .status(400)
        .json({ error: "Invalid blog link format" });
    }
    if (!request.file) {
      request.file = {
        path: "images/default-image.png",
        filename: "default-image.pngg",
      };
    }

    const image = request.file.path;
    try {
      const author = await Author.create({
        firstName,
        lastName,
        dob,
        nationality,
        biography,
        twitterLink,
        linkedinLink,
        blogLink,
        rating,
        image,
      });
      response.status(200).json(author);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  });
};
//delete author
//@returns {Object} The deleted author object.
export const deleteAuthor = async (request, response) => {
  const { id } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "no such author" });
  }
  const author = await Author.findOneAndDelete({ _id: id });
  if (!author) {
    return response.status(404).json({ error: "no such authorr" });
  }
  response.status(200).json(author);
};
// update author
//@returns {Object} The updated author object
export const updateAuthor = async (request, response) => {
  const { id } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "no such author" });
  }
  const author = await Author.findByIdAndUpdate(
    { _id: id },
    {
      ...request.body,
    },
    { new: true }
  );
  if (!author) {
    return response.status(404).json({ error: "no such author" });
  }
  response.status(200).json(author);
};
