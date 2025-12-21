Step by Step: execution


npm init -y

npm i express

setup - app.js and server.js

app.post()

npm i ejs

create views => index.ejs // it is like html file

app.set("view engine", "ejs")

npm i morgan

app.use(morgan("dev"))

app.get("/", (req,res)=>{
    res.render("index")
});


