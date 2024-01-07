// Import necessary modules
import Category from "../models/categorieModel.js";
// Get a single category
export const getCategory = async (request, response) => {
  const id = request.query.id;
  // console.log(request);
  // console.log(id);
  try {
    const category = await Category.findByPk(id);
    if (category) {
      return response.status(200).json(category);
    }
    return response.status(404).json({ error: "no such category" });
  } catch (error) {
    response.status(500).json({ message: "ERROR FETCHING CATEGORY" });
  }
};

// Get all Categories
export const getCtegories = async (req, res) => {
  // Retrieve all categories from the database and sort them by the 'createdAt' field in descending order
  try {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "ERROR FETCHING categories" });
  }
};

// Add a category to the database
export const createCtegory = async (req, res) => {
  const { name } = req.body;

  // Attempt to create a new category document in the database
  const existingCat = await Category.findOne({ where: { Name: name } });
  if (existingCat) {
    return res.status(400).json({ error: "Category already exists" });
  }
  try {
    const category = await Category.create({
      Name: name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category from the database
export const deleteCtegory = async (req, response) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return response.status(404).json("Category Not found");
    }
    await category.destroy();
    return response.status(200).json("Category deleted");
  } catch (error) {
    response.status(500).json({ message: err.message });
  }
};

// Update a category
export const updateCtegory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try{
    const category = await Category.findByPk(id);
    if (!category) {
      return response.status(404).json("Category Not found");
    }
    // Find and update a category by its ID with the data from the request body
    const updCat = await Category.update(
      { Name: name },
      { where: { id: category.id } ,returning:true}
    );
  
    if (!updCat) {
      return res.status(404).json({ error: "No such a category" });
    }
  
    res.status(200).json(updCat);
  }
  catch(err){
    response.status(500).json({ message: err.message });

  }
  
};
