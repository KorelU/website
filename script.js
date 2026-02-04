document.querySelectorAll(".read-more").forEach(button => {
  let lastScrollPos = 0; // store position before expand

  button.addEventListener("click", () => {
    const project = button.closest(".project");
    const description = project.querySelector(".description");
    const arrow = button.querySelector(".arrow");

    if (project.classList.contains("expanded")) {
      // Collapse
      description.style.maxHeight = '0';
      setTimeout(() => {
        description.style.display = 'none';
        // scroll back to original position
        window.scrollTo({ top: lastScrollPos, behavior: 'smooth' });
      }, 50); // wait for transition to finish
      project.classList.remove('expanded');
      button.childNodes[0].textContent = 'Read more ';
    } else {
      // Save scroll position before expanding
      lastScrollPos = window.scrollY;

      // Expand
      description.style.display = 'block';
      const scrollHeight = description.scrollHeight;
      description.style.maxHeight = scrollHeight + 'px';
      project.classList.add('expanded');
      button.childNodes[0].textContent = 'Read less ';
    }
  });
});