import mongoose from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";

//get all authors
export const getAuthors = async (request, response) => {
  const authors = await Author.find({}).sort({ createdAt: -1 });
  response.status(200).json(authors);
};
//get an author
export const getAuthor = async (request, response) => {
  const { id } = request.params;
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
export const createAuthor = async (request, response) => {
  upload.single("image")(request, response, async function (err){
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
    rating
  } = request.body;

  if (!request.file) {
    request.file = {
      path: 'images/default-image.png',
      filename: 'default-image.pngg',
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
      image
    });
    response.status(200).json(author);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});
};
//delete author
export const deleteAuthor = async (request, response) => {
  const { id } = request.params;
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
export const updateAuthor = async (request, response) => {
  const { id } = request.params;
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
