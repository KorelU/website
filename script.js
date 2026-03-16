document.querySelectorAll(".read-more").forEach(button => {
  let lastScrollPos = 0;

  button.addEventListener("click", () => {
    const container = button.closest(".project");
    if (!container) return;

    const description = container.querySelector(".description");

    if (container.classList.contains("expanded")) {
      // --- SMOOTH COLLAPSE ---
      // 1. Lock to current height so it doesn't 'snap' to 0
      description.style.maxHeight = description.scrollHeight + 'px';
      
      // 2. Trigger a reflow (The 'Secret Sauce' for smoothness)
      description.offsetHeight; 

      // 3. Animate to 0
      description.style.maxHeight = '0';
      
      setTimeout(() => {
        description.style.display = 'none';
        window.scrollTo({ top: lastScrollPos, behavior: 'smooth' });
      }, 400); 

      container.classList.remove('expanded');
      button.childNodes[0].textContent = 'Read more ';
    } else {
      // --- SMOOTH EXPAND ---
      lastScrollPos = window.scrollY;
      
      // 1. Show it but keep it invisible/collapsed
      description.style.display = 'block';
      description.style.maxHeight = '0';
      
      // 2. Wait for the browser to register 'display: block'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const fullHeight = description.scrollHeight;
          description.style.maxHeight = fullHeight + 'px';
        });
      });

      // 3. Remove the cap after animation
      setTimeout(() => {
        if (container.classList.contains("expanded")) {
          description.style.maxHeight = 'none'; 
        }
      }, 450); 

      container.classList.add('expanded');
      button.childNodes[0].textContent = 'Read less ';
    }
  });
});

document.querySelectorAll(".read-more").forEach(button => {
  let lastScrollPos = 0;

  button.addEventListener("click", () => {
    const container = button.closest(".notes");
    if (!container) return;
    const description = container.querySelector(".description");

    if (container.classList.contains("expanded")) {
      // --- COLLAPSE (CLOSING) ---
      
      // 1. Start scrolling back IMMEDIATELY (Removes the 'reset' delay)
      window.scrollTo({ top: lastScrollPos, behavior: 'smooth' });

      // 2. Set height to current pixels so it has a starting point to animate from
      description.style.maxHeight = description.scrollHeight + 'px';
      description.offsetHeight; // Force reflow so the browser 'feels' the height

      // 3. Shrink to 0
      description.style.maxHeight = '0';
      
      // 4. Reset UI text and class right away
      container.classList.remove('expanded');
      button.childNodes[0].textContent = 'Read more ';

      // 5. Cleanup: Hide element only AFTER the fast 0.2s animation
      setTimeout(() => {
        if (!container.classList.contains("expanded")) {
          description.style.display = 'none';
        }
      }, 0); 

    } else {
      // --- EXPAND (OPENING) ---
      
      lastScrollPos = window.scrollY;
      description.style.display = 'block';
      
      // Double frame wait ensures the 'display: block' is rendered before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          description.style.maxHeight = description.scrollHeight + 'px';
        });
      });

      // 6. Remove the 'cap' after opening (The 'None' cleanup)
      setTimeout(() => {
        if (container.classList.contains("expanded")) {
          description.style.maxHeight = 'none'; 
        }
      }, 450); 

      container.classList.add('expanded');
      button.childNodes[0].textContent = 'Read less ';
    }
  });
});