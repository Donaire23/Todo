const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3001;


mongoose.connect("mongodb+srv://anaDeArmaz:khemzzy@cluster0.4e3ok2n.mongodb.net/todoist_db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  app.use(express.json());
  app.use(
    cors({
      origin: ["https://todo-pink-seven.vercel.app"],
      methods: ["POST, GET, DELETE, PUT"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  const Register = require('./Model/RegistrationModel');
  const Task = require('./Model/TaskModel')

  const register = require('./Modules/registration')
  const login = require('./Modules/login')
  const user = require('./Modules/getData')
  const addTask = require('./Modules/addTask')

  app.use("/register", register)
  app.use("/login", login)
  app.use("/credentials", user)
  app.use('/addTask', addTask)

  app.listen(PORT, () => {
    console.log(`PORT is listening to ${PORT}`)
})
