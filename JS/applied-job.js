document.addEventListener("DOMContentLoaded", function () {
//   const jobs = [
//     {
//       title: "Frontend Developer",
//       company: "Google",
//       location: "Remote",
//       salary: "$120K",
//       date: "10 Jan 2026",
//       status: "pending",
//     },
//     {
//       title: "Backend Engineer",
//       company: "Amazon",
//       location: "Cairo",
//       salary: "$150K",
//       date: "8 Jan 2026",
//       status: "accepted",
//     },
//     {
//       title: "Full Stack Developer",
//       company: "Microsoft",
//       location: "Remote",
//       salary: "$140K",
//       date: "5 Jan 2026",
//       status: "pending",
//     },
//     {
//       title: "UI/UX Designer",
//       company: "Adobe",
//       location: "Dubai",
//       salary: "$110K",
//       date: "2 Jan 2026",
//       status: "rejected",
//     },
//     {
//       title: "DevOps Engineer",
//       company: "Netflix",
//       location: "Remote",
//       salary: "$160K",
//       date: "1 Jan 2026",
//       status: "accepted",
//     },
//   ];

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
          <div class="info">📅 Applied: ${job.date}</div>

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
