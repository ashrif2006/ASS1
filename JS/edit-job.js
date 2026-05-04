const pathArray = window.location.pathname.split('/');
const jobId = pathArray[pathArray.length - 2]; 

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('jobTitle', document.getElementById("jobTitle").value);
    formData.append('company', document.getElementById("company").value);
    formData.append('salary', document.getElementById("salary").value);
    formData.append('description', document.getElementById("description").value);
    formData.append('status', document.getElementById("status").value);

    fetch(`/update-job-api/${jobId}/`, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Job updated successfully in the database!');
            window.location.href = "/jobs/";
        }
    });
});

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete this job permanently?")) {
        fetch(`/delete-job-api/${jobId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Job deleted successfully from the database!');
                window.location.href = "/jobs/";
            }
        });
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
