document.addEventListener('DOMContentLoaded', () => {
    let isAdmin = false;
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
        try {
            const userData = JSON.parse(userDataStr);
            isAdmin = userData.role === 'admin'; // true or false
        } catch(e) {
            console.error("Error parsing user data", e);
        }
    }


    const currentPath = window.location.pathname;
    if (currentPath.endsWith('post-job.html') || currentPath.endsWith('edit-job.html')) {
        if (!isAdmin) {
            alert("Unauthorized access. Admin privileges required.");
            window.location.replace('index.html');
            return;
        }
    }

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'post-job.html' || link.getAttribute('href') === 'add-job.html') {
            link.textContent = "Add Job"; 
            if (!isAdmin) {
                link.style.display = 'none';
            }
        }
        if (link.getAttribute('href') === 'edit-job.html') {
            if (!isAdmin) {
                link.style.display = 'none';
            }
        }
    });
});
