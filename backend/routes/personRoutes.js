const express = require("express");
const Person = require("../models/personSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // if (
    //   data.name == "" ||
    //   data.email == "" ||
    //   data.age == null ||
    //   data.username == "" ||
    //   data.password == ""
    // ) {
    //   return res.status(204).json({ message: "No content" });
    // }
    const newPerson = new Person(data);
    if (await Person.findOne({ email: newPerson.email })) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const response = await newPerson.save();
    console.log("Data Submit Successfully");
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    // console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: user.id,
      username: username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    // const updatedPerson = req.body;
    let updatedPerson = req.body;

    for (var property in updatedPerson) {
      // console.log(property);

      if ("password" === property) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password, salt);
        updatedPerson.password = newPassword;
      }
    }
    // console.log(password);
    // if (password.password === "password") {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(res.body.password, salt);

    //   updatedPerson.password = hashedPassword;
    // }

    const data = await Person.findByIdAndUpdate(personId, updatedPerson, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      res.status(404).json({ error: "Person id not found" });
    }
    console.log("Person Data successfully updated");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const data = await Person.findByIdAndDelete(personId);
    if (!data) {
      res.status(404).json({ error: "Person id not found" });
    }
    console.log("Person Deleted Successfully");
    res.status(200).json({ message: "Person data deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
