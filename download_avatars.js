require('dotenv').config()
var request = require('request');
var fs = require('fs');
var path = require('path');

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

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}

if (process.argv.length != 4) {
  console.log(`syntax: ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} <repo-owner> <repo-name>`);
} else {
  oldAvatars = fs.readdirSync('avatars');
  oldAvatars.forEach(oldFile => {
    fs.unlinkSync('avatars/' + oldFile);
  });
  getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
    var contribs = JSON.parse(result);
    contribs.forEach(contrib => {
      downloadImageByURL(contrib.avatar_url, 'avatars/' + contrib.login + '.jpg')
    });
  });
}
