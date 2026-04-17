document.addEventListener("DOMContentLoaded", function () {
  var a = document.querySelector(".apply-btn");
  var s = document.querySelector(".save");

  if (a) {
    a.onclick = function () {
      a.innerText = "Applying...";
      a.disabled = true;

      setTimeout(function () {
        alert("done");
        a.innerText = "Apply Now";
        a.disabled = false;

        applyJob();
      }, 1100);
    };
  }

  if (s) {
    var x = false;

    s.onclick = function () {
      x = !x;

      if (x == true) {
        s.innerText = "Saved";
        saveJob(parseInt(localStorage.getItem("showJobId")));
      } else {
        s.innerText = "Save";
      }
    };
  }

  displayJobDetails();
});


//Ahmed Ashraf
//get job by id
function getJobById(id) {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs.find(job => job.id === id);
  return job;
}


// current job id
const currentJobId = parseInt(localStorage.getItem("showJobId"));


//Ahmed Ashraf
//to display job details
function displayJobDetails() {
  const job = getJobById(currentJobId);

  if (job) {
    document.getElementById("company").innerHTML = job.company;
    document.getElementById("jobType").innerHTML = job.status;
    document.getElementById("salary").innerHTML = job.salary;
    document.getElementById("description").innerHTML = job.description;
    document.getElementById("location").innerHTML = job.location;
    document.getElementsByClassName("job-title")[0].innerHTML = job.title;
  }
}

displayJobDetails();


//Ahmed Ashraf
//to add job in the applied jobs list and show in the applied jobs page
function applyJob() {
  const job = getJobById(currentJobId);

  if (!job) {
    alert("Job not found ❌");
    return;
  }

  const appliedJobs = JSON.parse(localStorage.getItem("appliedJob")) || [];

  const exists = appliedJobs.some(j => j.id === job.id);

  if (!exists) {
    appliedJobs.push(job);
    localStorage.setItem("appliedJob", JSON.stringify(appliedJobs));
  }
}


// Hagar
// saving job in the saved jobs page
function saveJob(id) {
  const job = getJobById(id);

  if (!job) {
    alert("Job not found ❌");
    return;
  }

  let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  const exists = savedJobs.some(j => j.id === job.id);

  if (exists) {
    alert("Already saved ⚠️");
    return;
  }

  savedJobs.push(job);
  localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

  alert("Saved successfully ✅");
}