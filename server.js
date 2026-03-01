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

  const labs = listLabs();

  progress.getProgress(req.user.username, (completed) => {

    const totalLabs = labs.length;
    const completedCount = completed.length;

    const percentage =
      totalLabs === 0
        ? 0
        : Math.round((completedCount / totalLabs) * 100);

    res.render("home", {
      labs,
      completed,
      totalLabs,
      completedCount,
      percentage
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
    consoleOutput: null
  });

});

/* ---------------- ATTACK ROUTE ---------------- */

app.post("/attack/:name", (req, res) => {

  const mode = req.query.mode || "vulnerable";
  const lab = loadLab(req.params.name, mode);

  if (!lab) {
    return res.send("Lab not found");
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
        query: query || "Query unavailable",
        message: challenge.message || "",
        completed: challenge.completed || false
      }
    });

  });

});

/* ---------------- RESET LAB ---------------- */

app.get("/reset/:name", (req, res) => {

  const resetHandler = loadReset(req.params.name);

  if (!resetHandler) {
    return res.send("Reset not available for this lab");
  }

  resetHandler(() => {

    res.send(`
      <h2>🔄 ${req.params.name.toUpperCase()} Lab Reset Successfully</h2>
      <a href="/lab/${req.params.name}">
        Return to Lab
      </a>
    `);

  });

});

/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {
  console.log("🚀 NJ SecForge running on http://localhost:3000");
});