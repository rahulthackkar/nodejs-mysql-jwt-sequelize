const app = require("./app");
const PORT = process.env.NODE_ENV === "test" ? 3001 : process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
