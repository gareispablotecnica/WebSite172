const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const sidebarMenu = document.getElementById("sidebarMenu")
const sidebarOverlay = document.getElementById("sidebarOverlay")
const sidebarClose = document.getElementById("sidebarClose")
const scrollToTopBtn = document.getElementById("scrollToTopBtn")

function closeSidebar() {
  mobileMenuBtn.classList.remove("active")
  sidebarMenu.classList.remove("active")
  sidebarOverlay.classList.remove("active")
  document.body.style.overflow = "auto"
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    const isActive = sidebarMenu.classList.contains("active")
    if (isActive) {
      closeSidebar()
    } else {
      mobileMenuBtn.classList.add("active")
      sidebarMenu.classList.add("active")
      sidebarOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })

  const navLinks = sidebarMenu.querySelectorAll(".sidebar-item, .sidebar-btn")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar()
    })
  })
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar)
}

if (sidebarClose) {
  sidebarClose.addEventListener("click", closeSidebar)
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebarMenu.classList.contains("active")) {
    closeSidebar()
  }
})

document.getElementById("year").textContent = new Date().getFullYear()

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  })
})

const observerOptions = {
  threshold: [0, 0.1, 0.3],
  rootMargin: "0px 0px -80px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0) scale(1)"
      entry.target.classList.add("animated")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document
  .querySelectorAll(".career-card, .feature-card, .contact-card, .badge, .hero-title, .hero-subtitle, .section-title")
  .forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px) scale(0.95)"
    el.style.transition = `opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
    observer.observe(el)
  })

let ticking = false
const parallaxElements = document.querySelectorAll(".hero-visual, .tech-grid")

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY
      parallaxElements.forEach((el) => {
        if (el.closest(".hero")) {
          const rect = el.closest(".hero").getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.transform = `translateY(${scrollY * 0.3}px)`
          }
        }
      })
      ticking = false
    })
    ticking = true
  }

  if (scrollToTopBtn) {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  }
})

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

document.querySelectorAll(".career-card, .feature-card, .contact-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.boxShadow = `0 0 40px rgba(0, 102, 204, 0.15), inset -${x / 10}px -${y / 10}px 30px rgba(0, 102, 204, 0.03)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "var(--shadow-sm)"
  })
})

let lastScrollY = 0
const navbar = document.querySelector(".navbar")

window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY

    if (scrollY > 100) {
      navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
      navbar.style.background = "rgba(255, 255, 255, 0.97)"
    } else {
      navbar.style.boxShadow = "none"
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }

    lastScrollY = scrollY
  },
  { passive: true },
)

window.addEventListener("load", () => {
  document.body.style.opacity = "1"

  const heroLeft = document.querySelector(".hero-left")
  if (heroLeft) {
    heroLeft.style.opacity = "1"
    heroLeft.style.animation = "fadeInUp 0.8s ease-out 0.2s both"
  }
})

document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease-out"
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.5)"
    ripple.style.pointerEvents = "none"
    ripple.style.animation = "ripple-expand 0.6s ease-out"

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

const style = document.createElement("style")
style.textContent = `
  @keyframes ripple-expand {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

const animateNumbers = (element, target, duration = 2000) => {
  let current = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + (target > 100 ? "%" : "+")
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + (target > 100 ? "%" : "+")
    }
  }, 16)
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValues = entry.target.querySelectorAll(".stat-value")
        statValues.forEach((stat) => {
          const targetValue = Number.parseInt(stat.textContent)
          animateNumbers(stat, targetValue)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroStats = document.querySelector(".hero-stats")
if (heroStats) {
  statsObserver.observe(heroStats)
}

document.querySelectorAll(".floating-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-30px) scale(1.08)"
    card.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
    card.style.transition = "all 0.3s ease"
  })
})
