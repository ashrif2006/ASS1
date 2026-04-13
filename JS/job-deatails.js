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
            }, 1100);
            applyJob();
          };
        }

        if (s) {
          var x = false;
          s.onclick = function () {
            if (x == false) {
              s.innerText = "Saved";
              x = true;
            } else {
              s.innerText = "Save";
              x = false;
            }
          };
        }
      });


//Ahmed Ashraf
//get job
function getJob() {
    const showJobId = localStorage.getItem("showJobId");
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobs.find(job => job.id === parseInt(showJobId));
    return job;
}      
function displayJobDetails() {
    const job = getJob();
    if(job) {
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
    const job = getJob();

    if (!job) {
        alert("Job not found ❌");
        return;
    }

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJob")) || [];
    console.log(appliedJobs);
    appliedJobs.push(job);
    localStorage.setItem("appliedJob", JSON.stringify(appliedJobs));
}