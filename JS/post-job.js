const form = document.getElementById("jForm");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("jopTitle").value;
  const company = form.querySelectorAll("input")[1].value;
  const status = form.querySelector("select").value;
  const salary = form.querySelectorAll("input")[2].value;
  const location = form.querySelectorAll("input")[3].value;
  const description = form.querySelector("textarea").value;
  const deadline = form.querySelectorAll("input")[4].value;
  const email = form.querySelectorAll("input")[5].value;

  const job = {
    id: Date.now(),
    title,
    company,
    status,
    salary,
    location,
    description,
    deadline,
    email
  };

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job Added Successfully ✅");

  form.reset();
});