document.addEventListener("DOMContentLoaded", function () {


const jobs = JSON.parse(localStorage.getItem("appliedJob")) || [];
console.log(jobs);
console.log("jobs");
  const container = document.querySelector(".jobs-container");

  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
          <div class="job-title">${job.title}</div>
          <div class="company">${job.company}</div>

          <div class="info">📍 ${job.location}</div>
          <div class="info">💰 ${job.salary}</div>
         

          <div class="status ${job.status}">
            ${job.status}
          </div>

          <button onclick="viewJobDetails()">View</button>
        `;

    container.appendChild(card);
  });
});


//Ahmed Ashraf
//when click an View go to the job details page and show the details of the job

function viewJobDetails() {
    const showJobId = localStorage.getItem("showJobId");
    localStorage.setItem("showJobId", showJobId);
    window.location.href = "job-details.html";
}
