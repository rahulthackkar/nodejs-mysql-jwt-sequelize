exports.publicAccess = (req, res) => {
  res.send(200).json({ message: "This is a public content" });
};
exports.userAccess = (req, res) => {
  res.send(200).json({ message: "This is a user content" });
};
exports.adminAccess = (req, res) => {
  res.send(200).json({ message: "This is an admin content" });
};
exports.moderatorAccess = (req, res) => {
  res.send(200).json({ message: "This is a moderator content" });
};
