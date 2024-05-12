import express from "express";
import ejs, { render } from "ejs";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import {searchGemi as searchGemi,searchRand as searchRand,search as search,addUser as addUser,connect as connect } from "../search/search.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
let app=express();
const port=8080;

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/adduser", (req, res) => {
  res.sendFile(__dirname + "/public/submit.html");
  app.post("/submit",(req,res)=>{
    const { name,email,password,specialization,rate}  = req.body;
    const fields={ name,email,password,specialization,rate} ;
    addUser(fields)
    .then(() => {
      res.redirect("https://hackbangalorelanding.onrender.com");
    })
    .catch(err => {
        console.error("Error adding user:", err);
        res.status(500).send("Error adding user");
    });
  }
);

  //addUserNew();
});

app.get("/search", (req, res) => {
  res.sendFile(__dirname + "/public/search.html");
  searchQuerry();
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

app.get("/connect",(req,res)=>{
  let result;
    connect().then(data => {
      result = data;
      console.log(result);
      res.render(__dirname + "/public/result.ejs", { users: result });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred while processing your request.");
    });
});

function searchQuerry(){
  app.post("/result",(req,res)=>{
      const { prompt, budget}  = req.body;
      //console.log({ prompt, budget });
      let result;
      searchRand(prompt, budget).then(data => {
        result = data;
        console.log(result);
        res.render(__dirname + "/public/result.ejs", { users: result });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred while processing your request.");
      });
      //renderQuery(prompt,budget);
    
    //console.log(querry);
    //res.render(__dirname + "/public/user.ejs",{user});
});}

//addUserNew();
//searchQuerry();
//renderQuery("cake",23456789)

app.listen(port, function() {
  console.log(`server is running at ${port}`);
});







/*module.exports = {
    getAns
  };*/
  

  /*

  function showALL(){
  app.get("/connect",(req,res)=>{
    let result;
      connect().then(data => {
        result = data;
        console.log(result);
        res.render(__dirname + "/public/result.ejs", { users: result });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("An error occurred while processing your request.");
      });

    //renderQuery(prompt,budget);
  
  //console.log(querry);
  //res.render(__dirname + "/public/user.ejs",{user});
});}
  const js = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    specialization: 'Web Development',
    rate: 50,
    working: true,
    createdAt: '2024-05-12',
    updatedAt: '2024-05-12',
  };*/

  /*function showUser(user){
  app.get("/user",(req,res)=>{
    res.render(__dirname + "/public/user.ejs",{user})
  })
}

showUser(js);
function renderQuery(query,budget){
  (async () => {
    try {
        const result = await searchRand("cake",60000);
        app.get("/result",(req,res)=>{
          res.render(__dirname + "/public/result.ejs", { users: result });
        })
    } catch (error) {
        console.error("Error occurred:", error);
    }
  })();}

//  renderQuery("cake",45000);
function searchQuerry2(){

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/search.html");
  });
  app.post("/result",(req,res)=>{
      const { prompt, budget } = req.body;
      //console.log({ prompt, budget })
      /*const data = {
        prompt: prompt,
        budget: budget,
    };
    res.render(__dirname + "/public/test.ejs", { data });
    (async () => {
      try {
          const result = await searchRand(prompt,budget);
          app.get("/result",(req,res)=>{
            res.render(__dirname + "/public/result.ejs", { users : result });
          })
      } catch (error) {
          console.error("Error occurred:", error);
      }
    })();
  //console.log(querry);
  //res.render(__dirname + "/public/user.ejs",{user});
})}

//searchQuerry2();


//renderQuery("cake",80000);

*/
