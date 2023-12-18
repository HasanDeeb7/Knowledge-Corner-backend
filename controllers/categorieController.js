// Import necessary modules
import Category from '../models/categorieModel.js'
// Get a single category
export const getCategory = async (req, res) => {
  const { id } = request.params;

  try{
const category=await Category.findByPk(id)
if(category){
return  response.status(200).json(category);

}
return response.status(404).json({ error: "no such category" });


  }
  catch(error){
    response.status(500).json({message:"ERROR FETCHING CATEGORY"})

  }
};

// Get all Categories
export const getCtegories = async (req, res) => {
  // Retrieve all categories from the database and sort them by the 'createdAt' field in descending order
  try{

    const categories = await Category.findAll({
      order:[[
        'createdAt','DESC'
      ]]
    });
  response.status(200).json(categories);

  }
  catch(error){
response.status(500).json({message:"ERROR FETCHING categories"})
  }
};

// Add a category to the database
export const createCtegory = async (req, res) => {
  const { name } = req.body;

  // Attempt to create a new category document in the database
  try {
    const category = await Category.create({
      name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category from the database
export const deleteCtegory = async (req, res) => {
  const { id } = req.params;

  try{
    const category=await Category.findByPk(id)
    if(!category){
    return  response.status(404).json("Category Not found");
    
    }
    await category.destroy()
    return response.status(200).json("Category deleted");

  
  }
  catch(error){
    response.status(500).json({message:err.message})}
 

};

// Update a category
export const updateCtegory = async (req, res) => {
  const { id } = req.params;

  const category=await Category.findByPk(id)
  if(!category){
  return  response.status(404).json("Category Not found");
  
  }
  // Find and update a category by its ID with the data from the request body
  const updCat = await category.update(
   
      ...req.body, // Update category with the data in the request body
    
  );

  if (!updCat) {
    return res.status(404).json({ error: "No such a category" });
  }

  res.status(200).json(updCat);
}