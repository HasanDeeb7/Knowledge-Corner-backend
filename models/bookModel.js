import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create a Mongoose schema for the "Book" collection.
const bookSchema = new Schema(
  {
    // Title of the book (String)
    title: {
      type: String, // Field type
      required: true, // Must be provided
      minlength: 2, // Minimum length of 2 characters
      maxlength: 100, // Maximum length of 100 characters
    },

    // ISBN (International Standard Book Number) of the book (String)
    ISBN: {
      type: String, // Field type
      required: true, // Must be provided
      unique: true, // Must be unique
    },

    // Publication date of the book (Date)
    publicationDate: {
      type: Date, // Field type
      required: true, // Must be provided
      max: Date.now(), // Should not be in the future
    },

    // Description of the book (String)
    description: {
      type: String, // Field type
      required: true, // Must be provided
      minlength: 10, // Minimum length of 10 characters
    },

    // Number of pages in the book (Number)
    nbPages: {
      type: Number, // Field type
      required: true, // Must be provided
      min: 1, // Minimum value of 1
      max: 10000, // Maximum value of 10,000
    },

    // Author ID associated with the book (Reference to the "Author" collection)
    authorId: {
      type: mongoose.Schema.Types.ObjectId, // Field type
      ref: 'Author', // Reference to the "Author" collection
      required: true, // Must be provided
    },

    // Category ID associated with the book (Reference to the "Category" collection)
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // Field type
      ref: 'Category', // Reference to the "Category" collection
      required: true, // Must be provided
    },

    // Image URL or path of the book cover (String)
    image: {
      type: String, // Field type
      required: true, // Must be provided
      match: /\.(jpg|jpeg|png)$/ // Should match a valid image file extension
    },

    // Language of the book (String)
    language: {
      type: String, // Field type
      required: true, // Must be provided
      enum: ['English', 'French', 'Arabic'], // Should be one of the specified values
    },

    // Rating of the book (Number)
    rating: {
      type: Number, // Field type
      required: true, // Must be provided
      min: 0, // Minimum value of 0
      max: 5, // Maximum value of 5
    },
  }, { timestamps: true }) // Automatically manage "createdAt" and "updatedAt" timestamps

  // Create a model for the "Book" collection using the schema.
export default mongoose.model("Book", bookSchema);
