async function populateProjects() {
  const requestURL = "js/projects.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const projectList = await response.json();

  let projNumber = 0;

  projectList.forEach((project) => {
    //icremet project number
    ++projNumber;
    let imageSrc = project.imageSrc;
    let altText = project.altText;
    let projTitle = project.title;
    let projType = project.type;
    let projDesc = project.description;
    let buttonList = project.buttons;

    let buttonBlock = "";

    buttonList.forEach((button) => {
      let buttonName = button.btnName;
      let buttonLink = button.link;
      let buttonAction = button.action;

      buttonBlock = buttonBlock.concat(
        `<a
          class="btn"
          href="${buttonLink}"
          ${buttonAction}
        >
          ${buttonName}
        </a> `
      );
    });

    let projectSection = `<section class="project-item ">
        <div class="row">
          <div class="col-md-4 pb-3">
            <div class="d-flex justify-content-center">
              <img
                src="${imageSrc}"
                class="img-fluid rounded"
                alt="${altText}"
              />
            </div>
          </div>
          <div class="col">
            <h3>${projTitle}</h3>
            <h5>${projType}</h5>
            <div >
              ${projDesc}
            </div>
            ${buttonBlock}
          </div>
        </div>
      </section>
      `;

    //add each project to the project list div
    //$("#projectList").append(projectSection);
    document.getElementById("projectList").innerHTML += projectSection;
  });
}

window.onload = function () {
  // This code will run when the document has finished loading.
  populateProjects();
};
