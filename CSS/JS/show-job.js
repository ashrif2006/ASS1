const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const tableBody = document.getElementById("jobTableBody");
const totalJobs = document.querySelector(".total span");

totalJobs.textContent = jobs.length;
console.log(jobs.length);

function displayJobs(data) {
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
          <button onclick="deleteJob(${job.id})">Delete</button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

displayJobs(jobs);


function deleteJob(id) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs = jobs.filter(job => job.id !== id);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs(jobs);
  totalJobs.textContent = jobs.length;
}


const searchInput = document.getElementById("Title");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(value)
  );

  displayJobs(filtered);
});