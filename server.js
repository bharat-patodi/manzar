const express = require("express");

const app = express();
const PORT = 5000;

// TEST ROUTE
app.get("/api/team", (req, res) => {
  const teamMates = [
    { id: 1, firstName: "Vishakha", lastName: "Khatade" },
    { id: 2, firstName: "Tinkal", lastName: "Deka" },
    { id: 3, firstName: "Bharat", lastName: "Jain" },
  ];
  res.json(teamMates);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
