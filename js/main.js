let projectList;
let projectListCopy;

async function getProjList() {
  // Get the project list from the JSON file
  const requestURL = "js/projects.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  // Set the project list to the response
  projectList = await response.json();
}

function makeListCopy() {
  // Create shallow copy of the project list that can be modified without affecting the original
  projectListCopy = projectList.slice();
}

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

// Function to pull projects from the list equal to the number requested by howMany
function getRandomItems(list, howMany) {
  let randomItems = [];
  let listLength = list.length;

  if (howMany > listLength && listLength > 0) {
    // Reduce the number of items requested to the length of the list
    howMany = listLength;
  } else if (listLength == 0) {
    // If the list is empty repopulate the list with the original list
    makeListCopy();
    list = projectListCopy;
    listLength = list.length;
  }

  for (let i = 0; i < howMany; i++) {
    let randomIndex = Math.floor(Math.random() * listLength);
    randomItems.push(list[randomIndex]);
    list.splice(randomIndex, 1);
    listLength--;
  }
  return randomItems;
}

// iterate over the project list and create HTML for each project
function writeProjHtml(list) {
  const projListDiv = document.getElementById("projectList");

  // Clear the project list div
  projListDiv.innerHTML = "";
  // Initialize a project counter
  let projNumber = 0;

  // Iterate over the list of projects
  list.forEach((project) => {
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
          class="btn btn-primary"
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
    projListDiv.innerHTML += projectSection;
  });
}

// Iterate over project list, create HTML for each project, and append it to the project list
function populateProjects(howMany = null, category = "All") {
  // Get projShowing header
  let projShowing = document.getElementById("projShowing");

  // Populate projects by howMany or category
  if (howMany != null) {
    let randomProjects = getRandomItems(projectListCopy, howMany);
    // Populate the projects div with the random projects
    writeProjHtml(randomProjects);
    // Write the number of projects to the projShowing header
    projShowing.innerHTML = `Showing: Random ${howMany}`;
  } else if (howMany == null) {
    // Write the category to the projShowing header
    projShowing.innerHTML = `Showing: ${category}`;
    // Refresh the projectListCopy
    makeListCopy();

    switch (category) {
      case "All":
        // Populate the projects div with all projects
        writeProjHtml(projectList);

        break;
      default:
        let categoryProjects = projectList.filter((project) => {
          // regardless of case, return true if the category matches
          return project.category?.includes(category.toLowerCase());
        });
        // Populate the projects div with the category projects list
        writeProjHtml(categoryProjects);
        break;
    }
  }
}

window.onload = function () {
  // This code will run when the document has finished loading.
  getProjList().then(() => {
    // Create shallow copy of the project list that can be modified without affecting the original
    makeListCopy();
    // Populate the projects div with an initial 5 random projects
    populateProjects((howMany = 5));
  });
};

// Force the nav menu to collapse when an link is selected
var navbarCollapse = document.querySelector(".navbar-collapse");

var navbarLinks = navbarCollapse.querySelectorAll("a");

navbarLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbarCollapse.classList.remove("show");
  });
});
