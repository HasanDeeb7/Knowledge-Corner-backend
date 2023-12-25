import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function withGoogle(req, res) {
  const { email, image, name } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          lastName: user.lastName,
          firstName: user.firstName,
        },
        process.env.JWT_SECRET
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .status(200)
        .json(user);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      console.log(hashedPassword);
      const generatedName =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = await User.create({
        username: generatedName,
        email: email,
        password: hashedPassword,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        image: image,
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          role: newUser.role,
          lastName: newUser.lastName,
          firstName: newUser.firstName,
        },
        process.env.JWT_SECRET
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
}
