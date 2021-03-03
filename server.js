const express = require("express");

const app = express();
const PORT = 5000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users").router;
const profilesRouter = require("./routes/profiles").router;
const portfoliosRouter = require("./routes/portfolios");

// TEST ROUTE
app.get("/api/team", (req, res) => {
  const teamMates = [
    { id: 1, firstName: "Vishakha", lastName: "Khatade" },
    { id: 2, firstName: "Tinkal", lastName: "Deka" },
    { id: 3, firstName: "Bharat", lastName: "Jain" },
  ];
  res.json(teamMates);
});

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/portfolios", portfoliosRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
