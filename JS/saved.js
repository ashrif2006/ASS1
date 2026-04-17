  function showDetails(id) {
  localStorage.setItem("showJobId", id);
  window.location.href = "job-details.html"; 
   }
document.addEventListener("DOMContentLoaded", function () {

  const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  const container = document.querySelector(".jobs-container");

  jobs.forEach((job) => {

    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <div class="job-title">${job.title}</div>
      <div class="company">${job.company}</div>

      <div class="info">📍 ${job.location}</div>
      <div class="info">💰 ${job.salary}</div>

      <div class="status">${job.status || "Saved"}</div>

      <button onclick="showDetails(${job.id})">
       View Details
       </button>
    `;

    container.appendChild(card);
  });

});