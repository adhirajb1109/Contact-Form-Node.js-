const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("contact", { layout: false });
});
app.get("/success", (req, res) => {
  res.render("success", { layout: false });
});
app.post("/send", (req, res) => {
  const output = `<h2>You have a new contact request .</h2><h3>Contact Details : </h3><h4>Name : ${req.body.name}</h4><h4>Email : ${req.body.email}</h4><h4>Phone Number : ${req.body.phone}</h4><h3>Message : </h3><h4>${req.body.message}</h4>`;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "adhirajb1109@gmail.com",
      pass: "Adhiraj@Bhat",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let info = {
    from: `adhirajb1109@gmail.com`,
    to: "adhirajb1109@gmail.com",
    subject: `You have a new contact request from ${req.body.name}`,
    html: output,
  };
  transporter.sendMail(info, (error, info) => {
    if (error) {
      return console.error(error);
    }
  });
  res.redirect("/success");
});

app.listen(1109, (req, res) => {
  console.log("Server Initialized On Port 1109");
});
