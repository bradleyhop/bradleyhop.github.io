function openBranch(evt, projects) {
    let x = document.getElementsByClassName("project-branch");
    let tab = document.getElementsByClassName("tab-button");

    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        tab[i].className = tab[i].className.replace(" tab-active", "");
    }

    document.getElementById(projects).style.display = "block";
    evt.currentTarget.className += " tab-active";
}
