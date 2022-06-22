exports.publicAccess = (req, res) => {
  res.json({ message: "This is a public content" });
};
exports.userAccess = (req, res) => {
  res.json({ message: "This is a user content" });
};
exports.adminAccess = (req, res) => {
  res.json({ message: "This is an admin content" });
};
exports.moderatorAccess = (req, res) => {
  res.json({ message: "This is a moderator content" });
};
