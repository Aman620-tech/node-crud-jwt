const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/mongoModel");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, address, mobile_no } =
        req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !address ||
        !mobile_no
      ) {
        return res.send("Please fill your  without empty space all details");
      }
      const find = await User.findOne({ email });
      if (find) {
        return res.json({ response: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(password, salt);
      const data = { firstName, lastName, email, secPass, address, mobile_no };
      const user = await User.create(data);
      let a = await user.save();
      // const jwtUser = await User.findOne({ email });
      // const jwt_id = jwtUser._id;
      // const token = await jwt.sign({ _id: jwt_id }, process.env.JWT_SECRET_KEY);
      res.json({ status: 200, response: "Registered" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.send("Fill all detail");
      }
      const user = await User.findOne({ email });
      const pass = user.secPass;

      const ismatch = await bcrypt.compareSync(password, pass); //
      if (ismatch) {
        const jwtUser = await User.findOne({ email });
        const jwt_id = jwtUser._id;
        const token = await jwt.sign(
          { _id: jwt_id },
          process.env.JWT_SECRET_KEY, { expiresIn: "24h" }
        );
        return res.json({ response: "Logged in successfully ", token: token });
      } else {
        return res.send("Sorry No data found. you need to register first ");
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  },
  all: async (req, res) => {
    try {
      const user = await User.find().select("-secPass");
      res.json({ status: "200", response: user });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
  singleUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      console.log(user);
      if (!user) {
        return res.send("User Don't exists");
      }
      res.json({ status: 200, response: user });
    } catch (error) {
      res.json({ error: error });
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.send("User Don't exists");
      }

      res.json({ "deleted user": "User deleted" });
    } catch (err) {
      res.send({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const newUpdate = req.body;
      const __id = req.params.id;
      const user = await User.findByIdAndUpdate(__id, newUpdate, {
        new: true,
      });

      res.json({ "Updated user  response": user });
    } catch (err) {
      res.send({ error: err });
    }
  },
};
