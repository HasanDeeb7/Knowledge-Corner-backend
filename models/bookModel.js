import { DataTypes } from "sequelize";
import sequelize from "../configs/db.js";

// Create a Mongoose schema for the "Book" collection.
const Book = sequelize.define(
  "Book",
  {
    // Title of the book (DataTypes.STRING)
    title: {
      type: DataTypes.STRING, // Field type
      allowNull: false, // Must be provided
      validate: { len: [2, 30] },
    },

    // ISBN (International Standard Book Number) of the book (DataTypes.STRING)
    ISBN: {
      type: DataTypes.STRING, // Field type
      allowNull: false, // Must be provided
      unique: true, // Must be unique
    },

    // Publication date of the book (Date)
    publicationDate: {
      type: DataTypes.DATE, // Field type
      allowNull: false, // Must be provided
      validate: {
        isNotInFuture(value) {
          const currentDate = new Date();
          if (value > currentDate) {
            throw new Error(
              "Birthdate must be equal to or earlier than the current date"
            );
          }
        },
      }, // Should not be in the future
    },

    // Description of the book (DataTypes.STRING)
    description: {
      type: DataTypes.STRING, // Field type
      allowNull: false, // Must be provided
      validate: { len: [10, Infinity] }, // Minimum length of 10 characters
    },

    // Number of pages in the book (Number)
    nbPages: {
      type: DataTypes.INTEGER, // Field type
      allowNull: false, // Must be provided
      validate: { min: 1, max: 10000 },
    },

    // Author ID associated with the book (Reference to the "Author" collection)

    // Image URL or path of the book cover (DataTypes.STRING)
    image: {
      type: DataTypes.STRING, // Field type
      allowNull: false, // Must be provided
      // match: /\.(jpg|jpeg|png)$/ // Should match a valid image file extension
    },

    // Language of the book (DataTypes.STRING)
    language: {
      type: DataTypes.ENUM("English", "French", "Arabic"), // Field type
      allowNull: false, // Must be provided
    },

    // Rating of the book (Number)
    rating: {
      type: DataTypes.INTEGER, // Field type
      allowNull: true, // Must be provided
      validate: { len: [0, 5] },
    },
    authorName: { type: DataTypes.STRING, defaultValue: "Unknown" },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Other",
    },
  },
  { timestamps: true }
); // Automatically manage "createdAt" and "updatedAt" timestamps

// Create a model for the "Book" collection using the schema.

export default Book;
