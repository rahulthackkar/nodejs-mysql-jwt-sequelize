const fs = require("fs");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = __dirname + "/../google-drive-token.json";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
exports.authorize = (req, res) => {
  fs.readFile(
    __dirname + "/../google-drive-credentials.json",
    "utf-8",
    (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Drive API.
      var credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, async (err, token) => {
        if (err || token !== null) {
          const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
          });
          res.redirect(authUrl);
          return;
        } else {
          res.redirect("/mydrive");
        }
      });
    }
  );
};

exports.authorizeCallback = (req, res) => {
  const code = req.query.code;
  //   res.send(req.query.code);
  //   return;
  if (code !== null) {
    fs.readFile(
      __dirname + "/../google-drive-credentials.json",
      "utf-8",
      (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Drive API.
        var credentials = JSON.parse(content);

        const { client_secret, client_id, redirect_uris } = credentials.web;
        var oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error("Error retrieving access token", err);
          // oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log("Token stored to", TOKEN_PATH);
            res.redirect("/mydrive");
          });
        });
      }
    );
  } else {
    res.redirect("/googledrive/authorize");
    return;
  }
};
/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listFiles = (req, res) => {
  fs.readFile(
    __dirname + "/../google-drive-credentials.json",
    "utf-8",
     (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      fs.readFile(TOKEN_PATH, "utf-8",  (err, token) => {
        // Authorize a client with credentials, then call the Google Drive API.
        var credentials = JSON.parse(content);
        var { client_secret, client_id, redirect_uris } = credentials.web;
        var oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        const drive = google.drive({ version: "v3", oAuth2Client });
        let files = drive.files.list(
          {
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
          },
          (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const files = res.data.files;
            if (files.length) {
              console.log("Files:");
              files.map((file) => {
                console.log(`${file.name} (${file.id})`);
              });
            } else {
              console.log("No files found.");
            }
          }
        );
        res.render("gdrive.ejs", {
          files: files,
          user: req.user,
        });
      });
    }
  );
};
