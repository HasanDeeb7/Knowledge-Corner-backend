import sequelize from "./configs/db.js";
import Book from "./models/bookModel.js";
import Library from "./models/libraryModel.js";

// Library and Book
Library.belongsToMany(Book, { through: "BookLibrary" });
Book.belongsToMany(Library, { through: "BookLibrary" });

// await sequelize.sync({ alter: true });
