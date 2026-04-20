const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const tableBody = document.getElementById("jobTableBody");
const totalJobs = document.querySelector(".total span");

totalJobs.textContent = jobs.length;
console.log(jobs.length);

function displayJobs(data) {
  let isAdmin = false;
  try {
    const user = JSON.parse(localStorage.getItem("userData"));
    isAdmin = user && user.role === 'admin';
  } catch(e) {}

  tableBody.innerHTML = "";

  data.forEach(job => {
    const row = `
      <tr>
        <td>
          <div class="job-info">
            <span class="title">${job.title}</span>
            <span class="sub-text">${job.status}</span>
          </div>
        </td>

        <td>
          <div class="company-info">
            <span>${job.company}</span>
          </div>
        </td>

        <td class="salary">$${job.salary}</td>

        <td>
          <span class="status new">NEW</span>
        </td>

        <td>
          ${isAdmin ? `<button onclick="editJob(${job.id})" style="margin-right: 5px;">Edit Job</button>` : ''}
          <button onclick="showDetails(${job.id})">Show Details</button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

function editJob(id) {
  localStorage.setItem("editJobId", id);
  window.location.href = "edit-job.html";
  console.log(jobs[id]);
}

function showDetails(id) {
  localStorage.setItem("showJobId", id);
  window.location.href = "job-details.html";
}

displayJobs(jobs);





const searchInput = document.getElementById("Title");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(value)
  );

  displayJobs(filtered);
});