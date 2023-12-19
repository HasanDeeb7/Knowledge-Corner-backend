import sequelize from "./configs/db.js";
import Author from "./models/authorModel.js";
import Book from "./models/bookModel.js";
import Library from "./models/libraryModel.js";

// Library and Book
Library.belongsToMany(Book, { through: "BookLibrary" });
Book.belongsToMany(Library, { through: "BookLibrary" });

// Author and Book
Book.belongsTo(Author);
Author.hasMany(Book);

// await sequelize.sync({ alter: true });
