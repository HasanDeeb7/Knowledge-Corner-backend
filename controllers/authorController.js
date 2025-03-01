import mongoose from "mongoose";
import fs from "fs";
import Author from "../models/authorModel.js";
import slugify from "slugify";

//get all authors
//@param {Object} request  -  @param {Object} response
//@returns {Object} An array of author objects
//@throws {Error} If there is an error while retrieving authors

export const getAuthors = async (request, response) => {
  try {
    const authors = await Author.findAll({});
    response.status(200).json(authors);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "ERROR FETCHING AUTHORS" });
  }
};

//get an author
//@returns {Object} The author object with the specified ID
export const getAuthor = async (request, response) => {
  const { id } = request.params;

  try {
    const author = await Author.findByPk(id);
    if (author) {
      return response.status(200).json(author);
    }
    return response.status(404).json({ error: "no such author" });
  } catch (error) {
    response.status(500).json({ message: "ERROR FETCHING AUTHOR" });
  }
};
//create author
//@returns {Object} The created author object.
export const createAuthor = async (request, response) => {
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
    return response.status(400).json({ error: "Required fields are missing" });
  }
  const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (dob && !dobPattern.test(dob)) {
    return response.status(400).json({ error: "Invalid date format" });
  }
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-])\/?$/;
  if (twitterLink && !urlPattern.test(twitterLink)) {
    return response.status(400).json({ error: "Invalid twitter link format" });
  }

  if (linkedinLink && !urlPattern.test(linkedinLink)) {
    return response
      .status(400)
      .json({ error: "Invalid LinkedIn link format." });
  }

  if (blogLink && !urlPattern.test(blogLink)) {
    return response.status(400).json({ error: "Invalid blog link format" });
  }
  if (!request.file) {
    request.file = {
      filename: "default-image.png",
    };
  }

  const image = request.file.filename;
  const slug=slugify(`${firstName} ${lastName}`,{lower:true})

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
      slug
    });

    return response.status(200).json(author);
  } catch (error) {
    response.status(400).json({ error: error.message });
    const path = `public/images/${request.file.filename}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    } else {
      console.error(`File does not exist at path: ${path}`);
    }
  }
};

//delete author
//@returns {Object} The deleted author object.
export const deleteAuthor = async (request, response) => {
  const { id } = request.params;
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return response.status(404).json({ error: "no such authorr" });
    }
    await author.destroy();
    response.status(200).json("Author deleted successfully");
  } catch (error) {
    response.status(500).json({ message: err.message });
  }
};

// update author
//@returns {Object} The updated author object
export const updateAuthor = async (request, response) => {
  const { id } = request.params;
  const updatedData = request.body;
  try {
    const authorValid = await Author.findByPk(id);
    if (!authorValid) {
      if (request.file) {
        fs.unlinkSync(request.file.filename);
      }
      return response.status(404).json({ error: "no such author" });
    }

    const oldImagePath = authorValid.image
      ? `public/images/${authorValid.image}`
      : null;

    if (request.file && request.file.filename !== "default-image.png") {
      updatedData.image = request.file.filename;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          return response.status(500).json({
            error: `error updating the photo`,
          });
        }
      });
    }

if(request.body.firstName && request.body.lastName)
{ const slug=slugify(`${request.body.firstName} ${request.body.lastName}`,{lower:true})
updatedData.slug=slug
  }
    const updatedAuthor = await Author.update(

      updatedData,
      { where: { id: id } } 
    );
    return response.status(200).json(updatedAuthor);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};
