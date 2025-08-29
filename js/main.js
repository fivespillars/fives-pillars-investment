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

/* ========================================
   CONTACT FORM WITH FORMSPREE INTEGRATION
   ======================================== */

/**
 * Setup contact form with Formspree integration and validation
 */
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // Rate limiting - prevent multiple submissions within 30 seconds
    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN = 30000; // 30 seconds
    
    if (form) {
        // Handle form submission
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Check rate limiting
            const now = Date.now();
            if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
                const remainingTime = Math.ceil((SUBMISSION_COOLDOWN - (now - lastSubmissionTime)) / 1000);
                showFormStatus('error', `Please wait ${remainingTime} seconds before submitting another message.`);
                return;
            }
            
            // Show loading state
            setFormLoading(true);
            
            try {
                // Get form data
                const formData = new FormData(form);
                
                // Basic client-side validation
                const validationResult = validateForm(formData);
                if (validationResult !== true) {
                    throw new Error(validationResult);
                }
                
                // Submit to Formspree with timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    },
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (response.ok) {
                    // Success - show success message
                    showFormStatus('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                    form.reset(); // Clear the form
                    lastSubmissionTime = now; // Update submission time
                } else {
                    // Error from Formspree
                    try {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to send message. Please try again.');
                    } catch (parseError) {
                        // If we can't parse the error response, show a generic message
                        throw new Error(`Server error (${response.status}). Please try again later.`);
                    }
                }
                
            } catch (error) {
                // Handle specific error types
                let errorMessage = 'An unexpected error occurred. Please try again.';
                
                if (error.name === 'AbortError') {
                    errorMessage = 'Request timed out. Please check your internet connection and try again.';
                } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                // Show error message
                showFormStatus('error', errorMessage);
            } finally {
                // Hide loading state
                setFormLoading(false);
            }
        });
        
        // Real-time validation feedback
        setupFormValidation(form);
        
        // Setup character counter for message field
        setupCharacterCounter();
    }
}

/**
 * Validate form data before submission
 * @param {FormData} formData - The form data to validate
 * @returns {string|true} - Error message if invalid, true if valid
 */
function validateForm(formData) {
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();
    
    // Check if honeypot field is filled (spam protection)
    if (formData.get('_gotcha')) {
        return 'Spam protection triggered. Please try again.';
    }
    
    // Validate name (2-100 characters, letters, spaces, hyphens, and apostrophes only)
    if (!name) {
        return 'Name is required.';
    }
    
    const nameRegex = /^[A-Za-z\s\-']{2,100}$/;
    if (!nameRegex.test(name)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes (2-100 characters).';
    }
    
    // Validate email format
    if (!email) {
        return 'Email is required.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }
    
    if (email.length > 254) {
        return 'Email address is too long.';
    }
    
    // Validate message (10-1000 characters, basic XSS protection)
    if (!message) {
        return 'Message is required.';
    }
    
    if (message.length < 10) {
        return 'Message must be at least 10 characters long.';
    }
    
    if (message.length > 1000) {
        return 'Message is too long (maximum 1000 characters).';
    }
    
    // Basic XSS protection - check for script tags and other dangerous patterns
    const dangerousPatterns = /<script|javascript:|vbscript:|onload=|onerror=|onclick=/i;
    if (dangerousPatterns.test(message)) {
        return 'Message contains invalid content. Please remove any special formatting.';
    }
    
    return true;
}

/**
 * Setup real-time form validation with visual feedback
 * @param {HTMLElement} form - The form element
 */
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Remove existing validation classes
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear validation on input
        input.addEventListener('input', function() {
            clearFieldValidation(this);
        });
    });
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field element to validate
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const minLength = field.minLength;
    const maxLength = field.maxLength;
    
    // Clear previous validation
    clearFieldValidation(field);
    
    // Check required field
    if (field.required && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    // Check minimum length
    if (minLength && value.length < minLength) {
        showFieldError(field, 'This field is too short.');
        return false;
    }
    
    // Check maximum length
    if (maxLength && value.length > maxLength) {
        showFieldError(field, 'This field is too long.');
        return false;
    }
    
    // Check email format
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    // Show success state
    showFieldSuccess(field);
    return true;
}

/**
 * Show error state for a form field
 * @param {HTMLElement} field - The field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

/**
 * Show success state for a form field
 * @param {HTMLElement} field - The field element
 */
function showFieldSuccess(field) {
    field.classList.add('success');
    
    // Remove error message if it exists
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Clear validation state for a form field
 * @param {HTMLElement} field - The field element
 */
function clearFieldValidation(field) {
    field.classList.remove('error', 'success');
    
    // Remove error message if it exists
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Show form submission status message
 * @param {string} type - Status type: 'success' or 'error'
 * @param {string} message - Status message to display
 */
function showFormStatus(type, message) {
    const formStatus = document.getElementById('form-status');
    
    if (formStatus) {
        // Set message content and styling
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Show the status message
        formStatus.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Set form loading state
 * @param {boolean} isLoading - Whether to show loading state
 */
function setFormLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (isLoading) {
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.classList.add('loading');
    } else {
        // Hide loading state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.classList.remove('loading');
    }
}

/**
 * Setup character counter for the message textarea
 */
function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    const currentCount = counter.querySelector('.current-count');
    
    if (messageField && counter) {
        // Update counter on input
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            currentCount.textContent = length;
            
            // Change color based on length
            if (length >= 1000) {
                counter.style.color = '#ff6b6b';
            } else if (length >= 800) {
                counter.style.color = '#ffa726';
            } else {
                counter.style.color = 'var(--white)';
            }
        });
        
        // Initialize counter
        currentCount.textContent = '0';
    }
} 