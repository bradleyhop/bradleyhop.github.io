function openBranch(evt, projects) {
  let branch = document.getElementsByClassName('project-branch');
  let tab = document.getElementsByClassName('tab-button');

  Object.entries(branch).map(el => (el[1].style.display = 'none'));
  Object.entries(tab).map(
    el => (el[1].className = el[1].className.replace(' tab-active', ''))
  );

  document.getElementById(projects).style.display = 'block';
  evt.currentTarget.className += ' tab-active';
}
