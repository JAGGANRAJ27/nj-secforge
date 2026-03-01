const express = require("express");
const bodyParser = require("body-parser");
const loadLab = require("./engine/labLoader");
const checkChallenge = require("./engine/challengeChecker");
const listLabs = require("./engine/listLabs");
const session = require("express-session");
const progress = require("./engine/progressManager");
const resetLab = require("./engine/resetLab");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: "njsecforge-secret",
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  req.user = { username: "guest" };
  next();
});

/* HOME */
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

/* ATTACK ROUTE */
const db = require("./config/db");

app.post("/attack/:name", (req, res) => {

  const mode = req.query.mode || "vulnerable";
  const lab = loadLab(req.params.name, mode);

  const { username, password } = req.body;

  lab.handler(db, username, password, (err, result, query) => {

    const challenge = checkChallenge(lab, result, mode);

    if (challenge.completed) {
      progress.markCompleted(req.user.username, req.params.name);
    }

    res.send(`
      <h2>${result.length > 0 ? "✅ Login Success" : "❌ Login Failed"}</h2>

      <h3>Mode: ${mode}</h3>

      <h3>Executed Query</h3>
      <pre>${query}</pre>

      <hr>

      <h2>${challenge.completed ? "🎉 Challenge Completed!" : "🧪 Try Again"}</h2>
      <p>${challenge.message}</p>

      <a href="/lab/${req.params.name}?mode=${mode}">
        Back to Lab
      </a>
    `);
  });
});

/* LAB ENGINE ROUTE ⭐ */
app.get("/lab/:name", (req, res) => {

  const mode = req.query.mode || "vulnerable";

  const lab = loadLab(req.params.name, mode);

  if (!lab) return res.send("Lab not found");

  res.render("lab", {
    lab,
    mode
  });
});

/* RESET LAB */
app.get("/reset/sqli", (req, res) => {

  resetLab.resetSQLiLab(() => {

    res.send(`
      <h2>🔄 SQL Injection Lab Reset Successfully</h2>
      <a href="/">Return to All Lab</a>
    `);

  });

});

app.listen(3000, () =>
  console.log("NJ SecForge running on http://localhost:3000")
);