function toggleDiv(divId, moreId, imgId) {
  /*
  Handles the show and hide for each project. 
  Toggles the classes on th project description div, the image div, and the more div (which serves as the expand and contract button and the partial cover of the description text). The args are the ids of the target divs.      
  */
  var div = document.getElementById(divId);
  var more = document.getElementById(moreId);
  var img = document.getElementById(imgId);

  // Get the Icon element of the more div
  const moreIcon = more.querySelector("i");

  // Expand the div to the height of the content
  if (div.classList.contains("project-desc-fixed")) {
    div.classList.remove("project-desc-fixed");
  } else {
    div.classList.add("project-desc-fixed");
  }

  // Remove the overlap and gradient on the more div
  if (more.classList.contains("proj-desc-less")) {
    more.classList.remove("proj-desc-less");
  } else {
    more.classList.add("proj-desc-less");
  }

  // Remove the overlap and gradient on the more div
  if (moreIcon.classList.contains("bi-chevron-double-down")) {
    moreIcon.classList.remove("bi-chevron-double-down");
    moreIcon.classList.add("bi-chevron-double-up");
  } else {
    moreIcon.classList.remove("bi-chevron-double-up");
    moreIcon.classList.add("bi-chevron-double-down");
  }

  // Remove the fixed height from the image divs
  if (img.classList.contains("project-img-fixed")) {
    img.classList.remove("project-img-fixed");
  } else {
    img.classList.add("project-img-fixed");
  }
}

async function populateProjects() {
  const requestURL = "js/projects.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const projectList = await response.json();

  let projNumber = 0;

  projectList.forEach((project) => {
    // Increment project number
    ++projNumber;
    let imageSrc = project.imageSrc;
    let altText = project.altText;
    let projTitle = project.title;
    let projType = project.type;
    let projDesc = project.description;
    let buttonList = project.buttons;
    let descDivId = "projNum" + projNumber;
    let descMoreId = descDivId + "_more";
    let imgDivId = descDivId + "_img";
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

    let projectSection = `
    <!-- Project: ${projTitle} --> 
    <section class="project-item ">
        <div class="row">
          <div class="col-md-4 pb-3">
            <div class="d-flex justify-content-center">
              <div class="project-img-fixed" id="${imgDivId}">
                <img
                  src="${imageSrc}"
                  class="img-fluid rounded"
                  alt="${altText}"
                />
              </div>
            </div>
          </div>
          <div class="col">
            <h3>${projTitle}</h3>
            <h5>${projType}</h5>
            <div class="project-desc-fixed" id="${descDivId}" >
              ${projDesc}
            </div>
            <div class="proj-desc-more proj-desc-less" id="${descMoreId}" onclick="toggleDiv('${descDivId}', this.id, '${imgDivId}')"><i class="bi bi-chevron-double-down" style="font-size: 1.5rem;"></i></div>            
            ${buttonBlock}
          </div>
        </div>
      </section>
      `;

    // Add each project to the project list div
    document.getElementById("projectList").innerHTML += projectSection;
  });
}

window.onload = function () {
  // This code will run when the document has finished loading.
  populateProjects();
};

// Force the nav menu to collapse when an link is selected
var navbarCollapse = document.querySelector(".navbar-collapse");

var navbarLinks = navbarCollapse.querySelectorAll("a");

navbarLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbarCollapse.classList.remove("show");
  });
});
