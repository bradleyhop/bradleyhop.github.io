function openBranch(projects) {
  let x = document.getElementsByClassName("project-branch");

  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  document.getElementById(projects).style.display = "block";
}
