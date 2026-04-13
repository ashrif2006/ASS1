
function displayEditJob(){
    const editJobId = localStorage.getItem("editJobId");
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const job = jobs.find(job => job.id === parseInt(editJobId));

    if (job) {
        document.getElementById("jobId").value = job.id;
        document.getElementById("jobTitle").value = job.title;
        document.getElementById("company").value = job.company;
        document.getElementById("salary").value = job.salary;
        document.getElementById("description").value = job.description;
        document.getElementById("status").value = job.status;
        console.log(job);
    }
}
displayEditJob();

function updateJob() {
    const editJobId = localStorage.getItem("editJobId");
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const job = jobs.find(job => job.id === parseInt(editJobId));

    if (job) {
        job.title = document.getElementById("jobTitle").value;
        job.company = document.getElementById("company").value;
        job.salary = document.getElementById("salary").value;
        job.description = document.getElementById("description").value;
        job.status = document.getElementById("status").value;
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

}

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", function(event) {
    event.preventDefault();
    updateJob();
    localStorage.removeItem("editJobId");
    window.location.href = "jobs.html";
})











function deleteJob(id) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs = jobs.filter(job => job.id !== id);

  localStorage.setItem("jobs", JSON.stringify(jobs));


}

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function() {
    const editJobId = localStorage.getItem("editJobId");
    deleteJob(parseInt(editJobId));
    localStorage.removeItem("editJobId");
    window.location.href = "jobs.html";
})