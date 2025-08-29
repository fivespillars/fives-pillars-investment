/* ========================================
   FIVES PILLARS - NAVBAR JAVASCRIPT FILE
   ======================================== */

// Wait for the DOM to be fully loaded before initializing navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sticky navbar with scroll effects
    initStickyNavbar();
    
    // Initialize scroll tracking for navigation highlighting
    initScrollTracking();
});

/* ========================================
   STICKY NAVBAR IMPLEMENTATION
   ======================================== */

/**
 * Initialize sticky navbar with scroll-based effects
 * Handles header positioning and shadow effects
 */
function initStickyNavbar() {
    const header = document.querySelector('header');
    const navigation = document.querySelector('nav');
    let lastScrollPosition = 0;

    /**
     * Handle scroll events to update navbar appearance
     */
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        // Always show header when at the top of the page
        if (currentScrollPosition <= 0) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.transform = 'translateY(0)';
            return;
        }

        // Add shadow effect when scrolled down for visual depth
        if (currentScrollPosition > 0) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Update last scroll position for future comparisons
        lastScrollPosition = currentScrollPosition;
    }

    // Add scroll event listener for real-time navbar updates
    window.addEventListener('scroll', handleScroll);

    // Perform initial check to set correct navbar state
    handleScroll();
}

/* ========================================
   SCROLL TRACKING IMPLEMENTATION
   ======================================== */

/**
 * Initialize scroll tracking to highlight current section in navigation
 * Uses Intersection Observer API for efficient scroll detection
 */
function initScrollTracking() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get all sections that correspond to navigation links
    const sections = document.querySelectorAll('section[id]');
    
    // Create a map of section IDs to navigation links for quick lookup
    const sectionLinkMap = new Map();
    
    // Build the mapping between sections and their corresponding nav links
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            sectionLinkMap.set(sectionId, correspondingLink);
        }
    });
    
    /**
     * Update active navigation link based on current scroll position
     * Uses scroll position to determine which section is most visible
     */
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Add offset for better detection
        
        let currentSection = '';
        let minDistance = Infinity;
        
        // Find the section closest to the current scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const distance = Math.abs(scrollPosition - sectionTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = section.getAttribute('id');
                }
            }
        });
        
        // Remove active class from all navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the current section's navigation link
        if (currentSection && sectionLinkMap.has(currentSection)) {
            const activeLink = sectionLinkMap.get(currentSection);
            activeLink.classList.add('active');
        }
    }
    
    /**
     * Handle smooth scrolling for navigation links
     * Prevents default anchor behavior and implements smooth scrolling
     */
    function handleNavClick(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate offset to account for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Smooth scroll to target section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click event listeners to all navigation links for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Add scroll event listener to update active navigation link
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Perform initial check to set correct active state
    updateActiveNavLink();
} 