document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.querySelector('.navbar');
    var navbarToggler = document.querySelector('.navbar-toggler');
    var fadeElements = document.querySelectorAll('.fade-in'); // Only select fade-in elements

    // Toggler click event for navbar
    navbarToggler.addEventListener('click', function () {
        navbar.classList.toggle('toggled');
    });

    // Function to check if an element is in the viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }

    // Add active class when elements are in the viewport
    function activateFadeIn() {
        fadeElements.forEach(function (el) {
            if (isInViewport(el)) {
                el.classList.add('active');
            }
        });
    }

    // Run the activation function on scroll
    window.addEventListener('scroll', activateFadeIn);

    // Also trigger on page load in case some elements are already in view
    activateFadeIn();
});
