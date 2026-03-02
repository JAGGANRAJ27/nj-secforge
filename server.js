const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const loadLab = require("./engine/labLoader");
const checkChallenge = require("./engine/challengeChecker");
const listLabs = require("./engine/listLabs");
const progress = require("./engine/progressManager");
const loadReset = require("./engine/resetLoader");

const db = require("./config/db");

const app = express();

/* ---------------- CONFIG ---------------- */

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "njsecforge-secret",
    resave: false,
    saveUninitialized: true
  })
);

/* Fake user (until auth system added) */
app.use((req, res, next) => {
  req.user = { username: "guest" };
  next();
});

/* ---------------- HOME DASHBOARD ---------------- */

app.get("/", (req, res) => {

  let labs = listLabs();

  const filter = req.query.difficulty || "all";

  /* Difficulty Filter */
  if (filter !== "all") {
    labs = labs.filter(
      lab => lab.difficulty.toLowerCase() === filter.toLowerCase()
    );
  }

  progress.getProgress(req.user.username, (completed) => {

    const totalLabs = labs.length;
    const completedCount =
      labs.filter(l => completed.includes(l.name)).length;

    const percentage =
      totalLabs === 0
        ? 0
        : Math.round((completedCount / totalLabs) * 100);

    res.render("home", {
      labs,
      completed,
      totalLabs,
      completedCount,
      percentage,
      filter
    });

  });

});

/* ---------------- LOAD LAB PAGE ---------------- */

app.get("/lab/:name", (req, res) => {

  const mode = req.query.mode || "vulnerable";

  const lab = loadLab(req.params.name, mode);

  if (!lab) {
    return res.send("Lab not found");
  }

  res.render("lab", {
    lab,
    mode,
    consoleOutput: null,
    practiceView: `labs/${lab.name}/practice`
  });

});

/* ---------------- ATTACK ROUTE ---------------- */

app.post("/attack/:name", (req, res) => {

  const mode = req.query.mode || "vulnerable";
  const lab = loadLab(req.params.name, mode);

  if (!lab || !lab.handler) {
    return res.render("lab", {
      lab,
      mode,
      consoleOutput: {
        success: false,
        query: "",
        message: "🚧 This lab is under construction.",
        completed: false
      }
    });
  }

  const { username, password } = req.body;

  lab.handler(db, username, password, (err, result, query) => {

    if (err) {
      console.error(err);
    }

    const challenge = checkChallenge(lab, result || [], mode);

    /* Save progress if completed */
    if (challenge.completed) {
      progress.markCompleted(req.user.username, req.params.name);
    }

    /* Render lab again with console output */
    res.render("lab", {
      lab,
      mode,
      consoleOutput: {
        success: result && result.length > 0,
        query,
        message: challenge.message,
        completed: challenge.completed
      },
      practiceView: `labs/${lab.name}/practice`
    });

  });

});

/* ---------------- RESET LAB ---------------- */

app.get("/reset/:name", (req, res) => {

  const labName = req.params.name;
  const db = require("./config/db");
  const resetHandler = loadReset(labName);

  db.run(
    "DELETE FROM progress WHERE lab = ?",
    [labName],
    () => {

      if (resetHandler) {
        resetHandler(finish);
      } else {
        finish();
      }
    }
  );

  function finish() {
    res.render("reset", { labName });
  }

});

/* ---------------- RESER ALL LABS ---------------- */
app.get("/reset-all", (req, res) => {

  const db = require("./config/db");

  db.serialize(() => {

    // reset lab environments
    db.run("DELETE FROM users");

    // reset progress
    db.run("DELETE FROM progress");

    // reset autoincrement counters
    db.run("DELETE FROM sqlite_sequence WHERE name='users'");
    db.run("DELETE FROM sqlite_sequence WHERE name='progress'");

    // restore default users (for labs needing them)
    db.run(`
      INSERT INTO users (username,password,role,lab)
      VALUES
      ('admin','admin123','admin','sqli'),
      ('user','1234','user','sqli'),
      ('guest','xss','user','xss')
    `, () => {

      res.send(`
        <h2>🔄 All Labs Reset Successfully</h2>
        <a href="/">Return Home</a>
      `);

    });

  });

});

/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {
  console.log("🚀 NJ SecForge running on http://localhost:3000");
});