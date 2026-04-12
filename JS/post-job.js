

 document.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById('jf'); // بدل jobForm

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // منع الريفريش

        var btn = form.querySelector('.btn'); // بدل post-btn
        var oldText = btn.innerText;

        btn.innerText = 'Posting...';
        btn.disabled = true;

        var data = new FormData(form);
        var obj = {};

        data.forEach(function (value, key) {
            obj[key] = value;
        });

        setTimeout(function () {
            alert('Success!');

            form.reset(); // مسح الفورم

            btn.innerText = oldText;
            btn.disabled = false;

            console.log(obj);
        }, 1000);
    });

    var inputs = document.querySelectorAll('input, select, textarea');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function () {
            this.parentElement.style.transition = '0.3s';
        });
    }

});


