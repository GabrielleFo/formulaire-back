require("dotenv").config();
const express = require("express");
const formidable = require ("express-formidable");
const cors = require ("cors");

/* MAILGUN CONFIGURATION */
const api_key = process.env.MAILGUN_API_KEY; /* VOTRE CLÉ API */
const domain = process.env.MAILGUN_DOMAIN; /* VOTRE DOMAINE SANDBOX */
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const app = express();

app.use(cors());
app.use(formidable());

app.get("/",(req,res) =>{
    res.send("Server is up!");
});

app.post("/",(req,res)=>{
const {firstname,lastname,email,subject,message} =req.fields;
/* CREATION DE L'OBJET DATA */
const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "fouix.gabrielle@gmail.com", /* EMAIL AVEC LAQUELLE VOUS VOUS ÊTES ENREGISTRÉS SUR MAILGUN */
    subject: subject,
    text: message,
  };
  /* ENVOI DE L'OBJET VIA MAILGUN */
  mailgun.messages().send(data, (error, body) => {
    if (!error) {
      return res.status(200).json(body);
    }
    res.status(401).json(error);
  });

});

app.listen(process.env.PORT, ()=>{
    console.log("Server has just started");
});
