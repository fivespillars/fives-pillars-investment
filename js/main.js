/* ========================================
   FIVES PILLARS - MAIN JAVASCRIPT FILE
   ======================================== */

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website with all core functionality
    initWebsite();
    
    // Setup the founder modal popup system
    setupFounderModal();
    
    // Setup the projects modal popup system
    setupProjectsModal();
    
    // Setup the fullscreen image modal system
    setupFullscreenImageModal();
    
    // Note: fade-in animations removed - not used in HTML
});

/* ========================================
   WEBSITE INITIALIZATION
   ======================================== */

/**
 * Main initialization function that sets up all website functionality
 */
function initWebsite() {
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add mobile menu functionality
    setupMobileMenu();
}

/* ========================================
   FADE-IN ANIMATIONS - REMOVED
   ======================================== */

/* Note: This function was removed as the fade-in-up class is not used in the HTML */

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

/**
 * Setup smooth scrolling for navigation links that point to page sections
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70; // Match the fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll to target element
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if it's open
                closeMobileMenu();
            }
        });
    });
}

/* ========================================
   MOBILE MENU FUNCTIONALITY
   ======================================== */

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    if (menuButton && navLinks && backdrop) {
        // Toggle menu and backdrop when button is clicked
        menuButton.addEventListener('click', () => {
            toggleMobileMenu();
        });

        // Close menu when clicking the backdrop
        backdrop.addEventListener('click', () => {
            closeMobileMenu();
        });

        // Close menu when clicking a navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

/**
 * Toggle mobile menu open/closed state
 */
function toggleMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
            backdrop.classList.toggle('active');
    
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
}

/**
 * Close mobile menu and restore normal scrolling
 */
function closeMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }

/* ========================================
   FOUNDER MODAL POPUP
   ======================================== */

/**
 * Setup founder modal popup for fullscreen founder images
 */
function setupFounderModal() {
    const modal = document.getElementById('founder-modal');
    const modalImage = modal.querySelector('.founder-modal-img');
    const modalCaption = modal.querySelector('.founder-modal-caption');
    const closeButton = modal.querySelector('.founder-modal-close');
    const backdrop = modal.querySelector('.founder-modal-backdrop');
    const founderPhotos = document.querySelectorAll('.founder-photo');

    // Add click event to each founder photo
    founderPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            openFounderModal(this);
        });
    });
    
    // Setup modal close functionality
    setupModalCloseHandlers(closeButton, backdrop, modal, modalImage);
}

/**
 * Open the founder modal with the clicked photo
 * @param {HTMLElement} photoElement - The clicked founder photo element
 */
function openFounderModal(photoElement) {
    const modal = document.getElementById('founder-modal');
    const modalImage = modal.querySelector('.founder-modal-img');
    const modalName = modal.querySelector('.founder-modal-name');
    const modalTitle = modal.querySelector('.founder-modal-title');
    const modalAutobiography = modal.querySelector('.founder-autobiography');
    
    // Get founder data from data attributes
    const founderName = photoElement.getAttribute('data-founder');
    const founderTitle = photoElement.getAttribute('data-title');
    const founderAutobiography = photoElement.getAttribute('data-autobiography');
    
    // Set modal image and alt text
    modalImage.src = photoElement.src;
    modalImage.alt = `Founder ${founderName}`;
    
    // Set founder name and title
    modalName.textContent = founderName;
    modalTitle.textContent = founderTitle;
    
    // Set autobiography content
    modalAutobiography.textContent = founderAutobiography;
    
    // Show modal and prevent body scroll
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
}

/**
 * Setup all modal close event handlers
 * @param {HTMLElement} closeButton - Modal close button
 * @param {HTMLElement} backdrop - Modal backdrop
 * @param {HTMLElement} modal - Modal container
 * @param {HTMLElement} modalImage - Modal image element
 */
function setupModalCloseHandlers(closeButton, backdrop, modal, modalImage) {
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modalImage.src = '';
        document.body.style.overflow = '';
    }
    
    // Close on close button click
    closeButton.addEventListener('click', closeModal);
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeModal);
    
    // Close on ESC key press
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active') && 
            (event.key === 'Escape' || event.key === 'Esc')) {
            closeModal();
        }
    });
} 

/* ========================================
   PROJECTS MODAL POPUP
   ======================================== */

/**
 * Setup projects modal popup for detailed project information
 */
function setupProjectsModal() {
    const modal = document.getElementById('projects-modal');
    const modalImage = modal.querySelector('.projects-modal-img');
    const modalName = modal.querySelector('.projects-modal-name');
    const modalDescription = modal.querySelector('.projects-description');
    const closeButton = modal.querySelector('.projects-modal-close');
    const backdrop = modal.querySelector('.projects-modal-backdrop');
    const projectLogoButtons = document.querySelectorAll('.project-logo-btn');

    // Add click event to each project logo button
    projectLogoButtons.forEach(button => {
        button.addEventListener('click', function() {
            openProjectsModal(this);
        });
    });
    
    // Setup modal close functionality
    setupProjectsModalCloseHandlers(closeButton, backdrop, modal, modalImage);
}

/**
 * Open the projects modal with the clicked project information
 * @param {HTMLElement} buttonElement - The clicked project logo button element
 */
function openProjectsModal(buttonElement) {
    const modal = document.getElementById('projects-modal');
    const modalImage = modal.querySelector('.projects-modal-img');
    const modalName = modal.querySelector('.projects-modal-name');
    const modalDescription = modal.querySelector('.projects-description');
    const galleryGrid = modal.querySelector('.projects-gallery-grid');
    
    // Get project data from data attributes
    const projectName = buttonElement.getAttribute('data-project');
    const projectDescription = buttonElement.getAttribute('data-description');
    const projectImages = buttonElement.getAttribute('data-images');
    
    // Get the logo image from the button
    const logoImg = buttonElement.querySelector('.project-logo');
    
    // Set modal image and alt text
    modalImage.src = logoImg.src;
    modalImage.alt = `${projectName} Project Logo`;
    
    // Set project name
    modalName.textContent = projectName;
    
    // Set project description
    modalDescription.textContent = projectDescription;
    
    // Populate project gallery with images
    populateProjectGallery(galleryGrid, projectImages);
    
    // Show modal and prevent body scroll
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Populate the project gallery with images
 * @param {HTMLElement} galleryGrid - The gallery grid container
 * @param {string} projectImages - Comma-separated list of image paths
 */
function populateProjectGallery(galleryGrid, projectImages) {
    // Clear existing gallery content
    galleryGrid.innerHTML = '';
    
    if (projectImages) {
        // Split the comma-separated image paths
        const imagePaths = projectImages.split(',');
        
        // Create image elements for each project image
        imagePaths.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath.trim();
            img.alt = 'Project Image';
            img.title = 'Click to view larger';
            
            // Add click event to show fullscreen image
            img.addEventListener('click', function() {
                openFullscreenImageModal(imagePath.trim(), 'Project Image');
            });
            
            galleryGrid.appendChild(img);
        });
    } else {
        // If no images, show a placeholder message
        const noImages = document.createElement('p');
        noImages.textContent = 'No project images available';
        noImages.style.color = 'var(--white)';
        noImages.style.opacity = '0.6';
        noImages.style.textAlign = 'center';
        noImages.style.gridColumn = '1 / -1';
        galleryGrid.appendChild(noImages);
    }
}

/**
 * Setup all projects modal close event handlers
 * @param {HTMLElement} closeButton - Modal close button
 * @param {HTMLElement} backdrop - Modal backdrop
 * @param {HTMLElement} modal - Modal container
 * @param {HTMLElement} modalImage - Modal image element
 */
function setupProjectsModalCloseHandlers(closeButton, backdrop, modal, modalImage) {
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modalImage.src = '';
        document.body.style.overflow = '';
    }
    
    // Close on close button click
    closeButton.addEventListener('click', closeModal);
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeModal);
    
    // Close on ESC key press
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active') && 
            (event.key === 'Escape' || event.key === 'Esc')) {
            closeModal();
        }
    });
} 

/* ========================================
   FULLSCREEN IMAGE MODAL POPUP
   ======================================== */

/**
 * Setup fullscreen image modal popup for project gallery images
 */
function setupFullscreenImageModal() {
    const modal = document.getElementById('fullscreen-image-modal');
    const modalImage = modal.querySelector('.fullscreen-image');
    const modalCaption = modal.querySelector('.fullscreen-image-caption');
    const closeButton = modal.querySelector('.fullscreen-image-close');
    const backdrop = modal.querySelector('.fullscreen-image-backdrop');

    // Setup modal close functionality
    setupFullscreenModalCloseHandlers(closeButton, backdrop, modal, modalImage);
}

/**
 * Open the fullscreen image modal with the clicked image
 * @param {string} imageSrc - The source URL of the clicked image
 * @param {string} imageAlt - The alt text of the clicked image
 */
function openFullscreenImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('fullscreen-image-modal');
    const modalImage = modal.querySelector('.fullscreen-image');
    const modalCaption = modal.querySelector('.fullscreen-image-caption');
    
    // Set modal image and alt text
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    
    // Set image caption (optional - you can customize this)
    modalCaption.textContent = imageAlt || 'Project Image';
    
    // Show modal and prevent body scroll
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Setup all fullscreen modal close event handlers
 * @param {HTMLElement} closeButton - Modal close button
 * @param {HTMLElement} backdrop - Modal backdrop
 * @param {HTMLElement} modal - Modal container
 * @param {HTMLElement} modalImage - Modal image element
 */
function setupFullscreenModalCloseHandlers(closeButton, backdrop, modal, modalImage) {
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modalImage.src = '';
        document.body.style.overflow = '';
    }
    
    // Close on close button click
    closeButton.addEventListener('click', closeModal);
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeModal);
    
    // Close on ESC key press
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active') && 
            (event.key === 'Escape' || event.key === 'Esc')) {
            closeModal();
        }
    });
} 