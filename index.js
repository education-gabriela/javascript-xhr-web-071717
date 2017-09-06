function showRepositories (event, data) {
  let repos = JSON.parse(this.responseText)
  let repoList = "<ul>";
  repoList += repos.map((element) => `<li><a href="#" data-repo="${element["name"]}" onclick="getCommits(this)">${element["name"]}</a></li>`).join("");
  repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories () {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos?access_token=e2b24abbf38d1d0725ec21ac88f13938383cf20b");
  req.send();
}

function getCommits (element) {
  const name = element.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/octocat/${name}/commits?access_token=e2b24abbf38d1d0725ec21ac88f13938383cf20b`);
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList =  `<ul>${commits.map((commit) => "<li><strong>" + commit.author.login + '</strong></li>').join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
