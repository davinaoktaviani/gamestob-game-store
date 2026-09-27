/* =========================================================
   MOBILE NAVIGATION TOGGLE
   Shared across all pages
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("open");
        toggle.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", isOpen);

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            nav.classList.remove("open");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("click", function (e) {

        if (
            nav.classList.contains("open") &&
            !nav.contains(e.target) &&
            !toggle.contains(e.target)
        ) {

            nav.classList.remove("open");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");

        }

    });

});
