(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("script.js = ", event);
        } else {
          document.querySelector("#loder").style.display = "inline";
          document.querySelector(".pageblur").style.opacity = ".5";
          event.submitter.disabled = true;
          event.submitter.innerHTML = "Loading..";
          event.submitter.style.fontSize = ".8rem";
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // Ripple Effect
  document.addEventListener("click", function (e) {
    let el = e.target.closest(".btn") || e.target.closest(".filter") || e.target.closest(".nav-user");
    if (el) {
      let rect = el.getBoundingClientRect();
      let circle = document.createElement("span");
      let diameter = Math.max(rect.width, rect.height);
      let radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");
      let ripple = el.querySelector(".ripple");
      if (ripple) {
        ripple.remove();
      }
      el.appendChild(circle);
    }
  });

  // Global Scroll Progress Bar
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

})();
