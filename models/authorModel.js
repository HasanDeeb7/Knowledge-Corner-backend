import Sequelize from "sequelize";
import sequelize from "../configs/db.js";

const Author = sequelize.define("Author", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  biography: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  twitterLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  linkedinLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  blogLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.STRING,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "default-image.png",
  },
});

export default Author;
