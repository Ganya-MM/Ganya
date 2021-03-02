const express = require("express");
const dbConfig = require("./app/config/db.config");
const app = express();
const path = require('path');


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const regsignRouter = require('./app/routes/regsign')

const db = require("./app/models");
const Role = db.role;


// app.use('/view',regsignRouter)

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

//view engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// simple route
app.get("/", (req, res) => {
res.render('../app/views/welcom')
});

app.get("/views", (req, res) => {
  res.render('../app/views/signup')
  });

 app.get("/login", (req, res) => {
    res.render('../app/views/signin')
    });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
