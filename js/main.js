/**
 * spa-mobile - Main JavaScript File
 * Handles all interactive elements and animations
 * Optimized for responsive design and mobile performance
 */

document.addEventListener("DOMContentLoaded", function () {
  // Detect mobile devices for performance optimization
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  // Detect orientation for specific optimizations
  const isLandscape = window.innerWidth > window.innerHeight;

  // Add mobile and orientation classes to body
  if (isMobile) {
    document.body.classList.add("mobile-device");
    if (isLandscape) {
      document.body.classList.add("landscape-orientation");
    } else {
      document.body.classList.add("portrait-orientation");
    }
  }

  // Apply mobile-specific optimizations
  if (isMobile) {
    // Simplified animations for mobile
    const animateSections = document.querySelectorAll("section");

    const mobileObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const mobileSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          mobileSectionObserver.unobserve(entry.target);
        }
      });
    }, mobileObserverOptions);

    animateSections.forEach((section) => {
      if (!section.classList.contains("hero")) {
        section.classList.add("section-animate");
        mobileSectionObserver.observe(section);
      }
    });
  }

  // Hero section parallax and animation effects (for non-mobile devices)
  const heroSection = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const heroOverlay = document.querySelector(".hero-overlay");
  const heroImage = document.querySelector(".hero-image img");

  if (!isMobile) {
    // Initial animation on page load
    setTimeout(() => {
      heroImage.style.transform = "scale(1.05)";
    }, 1000);

    // Parallax effect on scroll
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      if (scrollPosition < heroHeight) {
        // Calculate scroll percentage
        const scrollPercentage = scrollPosition / heroHeight;

        // Subtle fade effect for hero content
        heroContent.style.opacity = 1 - scrollPosition / (heroHeight * 0.7);

        // Parallax effect for hero image
        heroImage.style.transform = `scale(${
          1.05 + scrollPercentage * 0.05
        }) translateY(${scrollPosition * 0.15}px)`;

        // Subtle overlay opacity change
        heroOverlay.style.opacity = 0.6 + scrollPercentage * 0.2;
      }
    });

    // Add scroll-triggered animations to other sections
    const animateSections = document.querySelectorAll("section:not(.hero)");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateSections.forEach((section) => {
      section.classList.add("section-animate");
      sectionObserver.observe(section);
    });
  }
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector("nav");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileToggle.classList.contains("active")) {
        mobileToggle.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.height = "70px";
      header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.height = "80px";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });

  // Animate elements on scroll with performance optimization
  const animateElements = document.querySelectorAll(".animate");

  function checkIfInView() {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    });
  }

  // Run on initial load
  checkIfInView();

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(
        function () {
          scrollTimeout = null;
          checkIfInView();
        },
        isMobile ? 100 : 50
      ); // Longer timeout on mobile for better performance
    }
  });

  // Handle orientation changes
  window.addEventListener("orientationchange", function () {
    // Remove previous orientation classes
    document.body.classList.remove(
      "landscape-orientation",
      "portrait-orientation"
    );

    // Add new orientation class after a short delay to ensure the browser has updated dimensions
    setTimeout(function () {
      const isLandscapeNow = window.innerWidth > window.innerHeight;
      if (isLandscapeNow) {
        document.body.classList.add("landscape-orientation");
      } else {
        document.body.classList.add("portrait-orientation");
      }

      // Recalculate positions for fixed elements
      if (header) {
        if (window.scrollY > 50) {
          header.style.height = isMobile ? "65px" : "70px";
        } else {
          header.style.height = isMobile ? "70px" : "80px";
        }
      }

      // Force recalculation of section animations
      checkIfInView();
    }, 300);
  });

  // Form validation
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      let valid = true;
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Reset error messages
      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, "Veuillez entrer votre nom");
        valid = false;
      }

      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, "Veuillez entrer votre email");
        valid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Veuillez entrer un email valide");
        valid = false;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, "Veuillez entrer votre message");
        valid = false;
      }

      // If valid, submit the form (in a real scenario, you would send the data to a server)
      if (valid) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent =
          "Votre message a été envoyé avec succès. Nous vous contacterons bientôt!";

        contactForm.reset();
        contactForm.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }

  // Helper functions
  function showError(input, message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;

    input.parentNode.appendChild(errorMessage);
    input.classList.add("error");

    input.addEventListener(
      "input",
      function () {
        errorMessage.remove();
        input.classList.remove("error");
      },
      { once: true }
    );
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
