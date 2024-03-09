import userModel from "../model/userModel.js";
import brycpt from "bcrypt";
export const register = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { username, password, email } = req.body;
    //check the username exists in the database
    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck) {
      res.json({
        msg: "username already exist",
        status: false,
      });
    }
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      res.json({
        msg: "email already exist",
        status: false,
      });
    }
    //bcrypt is a password-hashing library used for securely hashing and storing passwords. It has become a popular choice for password hashing
    const hashpassword = await brycpt.hash(password, 10);
    //   console.log(hashpassword);
    const user = await userModel.create({
      username,
      password: hashpassword,
      email,
    });
    delete user.password;
    res.json({
      msg: "user registered successfully",
      status: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { username, password } = req.body;
    //check the username exists in the database
    const usernameCheck = await userModel.findOne({ username });
    if (!usernameCheck) {
      res.json({
        msg: "username does not exist",
        status: false,
      });
    }
    const passwordCheck = await brycpt.compare(
      password,
      usernameCheck.password
    );
    if (!passwordCheck) {
      res.json({
        msg: "password does not match",
        status: false,
      });
    } else {
      delete usernameCheck.password;
      return res.json({
        msg: "user logged in successfully",
        status: true,
        user: usernameCheck,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const setavatar = async (req, res, next) => {
  // console.log(req.body);
  // next();
  // res.send("ok");
  try {
    const user_id = req.params.id;
    // console.log(user_id);
    const avatar = req.body.image;
    const user_data = await userModel.updateOne(
      {
        _id: user_id,
      },
      { isAvatarImageSet: true, AvaterImage: avatar }
    );
    // res.send("ok");
    const user_data1 = await userModel.find({ _id: user_id });
    // console.log(user_data1[0].AvaterImage);
    return res.json({
      isSet: user_data1[0].isAvatarImageSet,
      image: user_data1[0].AvaterImage,
    });
  } catch (err) {
    next(err);
  }
};

export const allusers = async (req, res, next) => {
  // console.log(req.url);
  try {
    const users = await userModel.find(
      {
        _id: { $ne: req.params.id },
      },
      {
        username: 1,
        email: 1,
        isAvatarImageSet: 1,
        AvaterImage: 1,
      }
    );
    // console.log(users);
    // res.send("ok");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
