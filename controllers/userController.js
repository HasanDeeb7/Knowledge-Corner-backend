import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const hashedPass = bcryptjs.hashSync(password, 10);

  try {
    const userExist = await User.findOne({where:
      { email }});
    if (userExist) {
      res.status(404).json({ message: "Email already Exists" });
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
      role,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Error Creating a user");
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({where:{ email }});
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(500).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        lastName: user.lastName,
        firstName: user.firstName,
      },
      process.env.JWT_SECRET
    );
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Login successfull"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Sign In" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    }

    res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    res.status(400).json({ message: "Error getting a user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params.id;
  try {
    const user = await User.destroy({where:{id:id}});
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting a user" });
  }
};

export const updateUser = async (req, res) => {
  const { id, firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = bcryptjs.hashSync(password, 10);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating a user" });
  }
};


export const updateStatus=async(req,res)=>{
  const{id,status}=req.body

  try{
    const user=await User.findByPk(id)
    if(!user){
      res.status(404).json({message:"User Not Found"})
    }
   user.status=status
  await user.save()
res.status(200).json("updated successfully")
  }
  catch(error){
    res.status(500).json({ message: "Error updating a user status" });

  }
}
