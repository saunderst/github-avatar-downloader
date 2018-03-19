require('dotenv').config()
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'saunderst',
      'Authorization': 'token ' + process.env.GH_AUTH
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var contribs = JSON.parse(result);
  contribs.forEach(contrib => {
    console.log (contrib.avatar_url);
  });
});
