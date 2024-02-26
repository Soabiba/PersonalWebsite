document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var navbarToggler = document.querySelector('.navbar-toggler');

    navbarToggler.addEventListener('click', function() {
        navbar.classList.toggle('toggled');
    });
});

