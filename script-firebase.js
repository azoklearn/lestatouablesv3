// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.setAttribute('aria-label', 'Ouvrir le menu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'menu');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isActive ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Close menu only when clicking on a leaf link (sans sous-menu) ou un lien de sous-menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const li = link.parentElement;
        const hasDirectSubmenu = li && li.querySelector(':scope > .nav-submenu');
        if (hasDirectSubmenu) {
            // Parent avec sous-menu: ne pas fermer ici (le toggle gère l'ouverture)
            return;
        }
        // Lien de sous-menu ou lien simple: fermer le panneau
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Ouvrir le menu');
    });
});

// Toggle sous-menus dans le panneau hamburger (tous écrans)
document.querySelectorAll('.nav-menu > li > a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const parent = anchor.parentElement;
        const submenu = parent.querySelector('.nav-submenu');
        if (submenu) {
            e.preventDefault();
            parent.classList.toggle('is-open');
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Votre message a été envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server
        // For now, we'll just show a success message
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Portfolio item hover effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add loading animation for images (if any are added later)
function addLoadingAnimation() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const show = () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
        // Si l'image est déjà chargée (cache), afficher directement
        if (img.complete && img.naturalWidth > 0) {
            show();
            return;
        }
        // Sinon, appliquer l'animation de fade-in à la fin du chargement
        img.addEventListener('load', show, { once: true });
        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Initialize loading animations
addLoadingAnimation();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Delay the typing effect to work with CSS animations
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
    
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // In a real application, you would send this data to your analytics service
    console.log(`Tracked: ${action} on ${element}`);
}

// Add click tracking to important elements
document.querySelectorAll('.btn, .nav-link, .portfolio-item, .service-card').forEach(element => {
    element.addEventListener('click', (e) => {
        trackClick(e.target, 'click');
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #667eea';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================
// Flash (Firebase) — lecture + filtre
// ============================
let firebaseService = null;

// Initialiser Firebase quand le module est chargé
async function initFirebase() {
    try {
        const module = await import('./firebase-config.js');
        firebaseService = module.firebaseService;
        console.log('Firebase initialisé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de Firebase:', error);
        // Fallback vers localStorage si Firebase n'est pas disponible
        initLocalStorageFallback();
    }
}

function initLocalStorageFallback() {
    console.log('Utilisation du localStorage comme fallback');
    // Code de fallback vers localStorage (votre code existant)
}

async function readFlashItems() {
    if (firebaseService) {
        try {
            return await firebaseService.getFlashItems();
        } catch (error) {
            console.error('Erreur Firebase, fallback vers localStorage:', error);
            return readFlashItemsLocalStorage();
        }
    }
    return readFlashItemsLocalStorage();
}

function readFlashItemsLocalStorage() {
    try {
        const raw = localStorage.getItem('flashItems');
        if (!raw) { return []; }
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.error('Erreur de lecture flashItems localStorage', e);
        return [];
    }
}

async function renderFlashList(items) {
    const grid = document.getElementById('flash-grid');
    const tpl = document.getElementById('flash-card-template');
    if (!grid || !tpl) return;
    grid.innerHTML = '';
    if (!items || items.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'flash-empty';
        empty.textContent = 'Aucun flash pour le moment. Ajoutez-en via la page Admin.';
        grid.appendChild(empty);
        return;
    }
    items.forEach(item => {
        const node = tpl.content.cloneNode(true);
        const img = node.querySelector('.flash-img');
        const cap = node.querySelector('.flash-caption');
        img.src = item.imageData || 'https://placehold.co/600x600?text=Flash';
        img.alt = item.title || 'Tatouage flash';
        cap.textContent = item.title || '';
        grid.appendChild(node);
    });
}

async function initFlash() {
    const search = document.getElementById('flash-search');
    const clear = document.getElementById('flash-clear');
    
    // Initialiser Firebase
    await initFirebase();
    
    // Seed initial si vide (une seule fois)
    let items = await readFlashItems();
    try {
        const seeded = localStorage.getItem('flashSeeded');
        if ((!items || items.length === 0) && !seeded) {
            const defaultItems = [
                { title: "Flash Manga #1", tags: ['manga','couleur'], imageData: 'https://placehold.co/800x800?text=Flash+Manga+1' },
                { title: "Flash Anime #2", tags: ['anime','line'], imageData: 'https://placehold.co/800x800?text=Flash+Anime+2' },
                { title: "Pop Culture #3", tags: ['pop','culture'], imageData: 'https://placehold.co/800x800?text=Pop+Culture+3' }
            ];
            
            if (firebaseService) {
                // Ajouter à Firebase
                for (const item of defaultItems) {
                    await firebaseService.addFlashItem(item);
                }
            } else {
                // Fallback localStorage
                localStorage.setItem('flashItems', JSON.stringify(defaultItems));
            }
            localStorage.setItem('flashSeeded', '1');
            items = await readFlashItems();
        }
    } catch (e) { 
        console.warn('Seed flash ignoré:', e); 
    }
    
    await renderFlashList(items);

    function applyFilter() {
        const q = (search?.value || '').toLowerCase().trim();
        if (!q) { renderFlashList(items); return; }
        const filtered = items.filter(x => {
            const bucket = [x.title, ...(x.tags || [])].join(' ').toLowerCase();
            return bucket.includes(q);
        });
        renderFlashList(filtered);
    }

    search?.addEventListener('input', applyFilter);
    clear?.addEventListener('click', () => { if(search){ search.value=''; } applyFilter(); });
    
    // Écouter les changements en temps réel si Firebase est disponible
    if (firebaseService) {
        firebaseService.onFlashItemsChange((snapshot) => {
            const newItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            items = newItems;
            applyFilter();
        });
    }
}

// ============================
// Sinkolor Creations (Firebase) — lecture + affichage
// ============================
async function readSinkolorCreations() {
    if (firebaseService) {
        try {
            return await firebaseService.getSinkolorCreations();
        } catch (error) {
            console.error('Erreur Firebase, fallback vers localStorage:', error);
            return readSinkolorCreationsLocalStorage();
        }
    }
    return readSinkolorCreationsLocalStorage();
}

function readSinkolorCreationsLocalStorage() {
    try {
        const raw = localStorage.getItem('sinkolorCreations');
        if (!raw) { return []; }
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.error('Erreur de lecture sinkolorCreations localStorage', e);
        return [];
    }
}

async function renderSinkolorCreations(creations) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    // Ne pas vider la grille si elle n'est pas celle de Sinkolor
    if (!document.querySelector('.sinkolor-page')) return;
    
    grid.innerHTML = '';
    
    if (!creations || creations.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'portfolio-item';
        empty.style.textAlign = 'center';
        empty.style.padding = '2rem';
        empty.innerHTML = `
            <div class="portfolio-image">
                <i class="fas fa-palette" style="font-size: 3rem; color: #666;"></i>
            </div>
            <div class="portfolio-overlay">
                <h3>Aucune création pour le moment</h3>
                <p>Les créations de Sinkolor seront bientôt disponibles</p>
            </div>
        `;
        grid.appendChild(empty);
        return;
    }
    
    creations.forEach(creation => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.setAttribute('data-category', creation.category || 'all');
        item.setAttribute('data-creation-id', creation.id || '');
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'portfolio-image';
        
        if (creation.imageData) {
            const img = document.createElement('img');
            img.src = creation.imageData;
            img.alt = creation.title || 'Création Sinkolor';
            img.loading = 'lazy';
            imageDiv.appendChild(img);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-palette';
            icon.style.fontSize = '3rem';
            icon.style.color = '#666';
            imageDiv.appendChild(icon);
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'portfolio-overlay';
        overlay.innerHTML = `
            <h3>${creation.title || 'Création Sinkolor'}</h3>
            <p>${creation.description || 'Tatouage artistique'}</p>
            <a href="#contact" class="portfolio-link">Demander un devis</a>
        `;
        
        item.appendChild(imageDiv);
        item.appendChild(overlay);
        grid.appendChild(item);
    });
}

async function initSinkolorCreations() {
    // Initialiser Firebase
    await initFirebase();
    
    // Charger les créations
    let creations = await readSinkolorCreations();
    
    // Seed initial si vide (une seule fois)
    try {
        const seeded = localStorage.getItem('sinkolorSeeded');
        if ((!creations || creations.length === 0) && !seeded) {
            const defaultCreations = [
                { 
                    title: "Tatouage Manga #1", 
                    description: "Création inspirée de l'univers manga",
                    category: "manga",
                    imageData: 'https://placehold.co/600x600?text=Manga+1' 
                },
                { 
                    title: "Tatouage Disney #2", 
                    description: "Personnage Disney stylisé",
                    category: "disney",
                    imageData: 'https://placehold.co/600x600?text=Disney+2' 
                },
                { 
                    title: "Pop Culture #3", 
                    description: "Référence culturelle moderne",
                    category: "pop",
                    imageData: 'https://placehold.co/600x600?text=Pop+Culture+3' 
                }
            ];
            
            if (firebaseService) {
                // Ajouter à Firebase
                for (const creation of defaultCreations) {
                    await firebaseService.addSinkolorCreation(creation);
                }
            } else {
                // Fallback localStorage
                localStorage.setItem('sinkolorCreations', JSON.stringify(defaultCreations));
            }
            localStorage.setItem('sinkolorSeeded', '1');
            creations = await readSinkolorCreations();
        }
    } catch (e) { 
        console.warn('Seed Sinkolor ignoré:', e); 
    }
    
    await renderSinkolorCreations(creations);
    
    // Écouter les changements en temps réel si Firebase est disponible
    if (firebaseService) {
        firebaseService.onSinkolorCreationsChange((snapshot) => {
            const newCreations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderSinkolorCreations(newCreations);
        });
    }
    
    // Gestion des boutons d'administration
    const toggleEditBtn = document.getElementById('toggleEditPortfolio');
    const addCreationBtn = document.getElementById('addCreation');
    
    if (toggleEditBtn && addCreationBtn) {
        let editMode = false;
        
        toggleEditBtn.addEventListener('click', () => {
            editMode = !editMode;
            addCreationBtn.style.display = editMode ? 'block' : 'none';
            toggleEditBtn.innerHTML = editMode ? 
                '<i class="fas fa-times" style="margin-right: 8px;"></i>Terminer' : 
                '<i class="fas fa-edit" style="margin-right: 8px;"></i>Gérer les créations';
            
            // Ajouter/supprimer les boutons d'édition sur chaque création
            const portfolioItems = document.querySelectorAll('#portfolioGrid .portfolio-item');
            portfolioItems.forEach(item => {
                let editControls = item.querySelector('.edit-controls');
                if (editMode && !editControls) {
                    editControls = document.createElement('div');
                    editControls.className = 'edit-controls';
                    editControls.style.cssText = 'position: absolute; top: 10px; right: 10px; display: flex; gap: 5px; z-index: 10;';
                    
                    const editBtn = document.createElement('button');
                    editBtn.className = 'btn btn-secondary';
                    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
                    editBtn.style.cssText = 'padding: 5px 8px; font-size: 0.8rem;';
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const creationId = item.getAttribute('data-creation-id');
                        if (creationId) editCreation(creationId);
                    });
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn btn-secondary';
                    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    deleteBtn.style.cssText = 'padding: 5px 8px; font-size: 0.8rem; background: #e74c3c;';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const creationId = item.getAttribute('data-creation-id');
                        if (creationId) deleteCreation(creationId);
                    });
                    
                    editControls.appendChild(editBtn);
                    editControls.appendChild(deleteBtn);
                    item.style.position = 'relative';
                    item.appendChild(editControls);
                } else if (!editMode && editControls) {
                    editControls.remove();
                }
            });
        });
        
        addCreationBtn.addEventListener('click', () => {
            showAddCreationModal();
        });
    }
}

// Fonction pour afficher le modal d'ajout de création
function showAddCreationModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="margin-bottom: 1.5rem; color: #2c3e50;">Ajouter une création Sinkolor</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Titre :</label>
                <input type="text" id="creationTitle" placeholder="Titre de la création" style="
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                ">
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Description :</label>
                <textarea id="creationDescription" placeholder="Description de la création" rows="3" style="
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                    resize: vertical;
                "></textarea>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Catégorie :</label>
                <select id="creationCategory" style="
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                ">
                    <option value="manga">Manga</option>
                    <option value="disney">Disney</option>
                    <option value="pop">Pop Culture</option>
                    <option value="anime">Anime</option>
                    <option value="other">Autre</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">URL de l'image :</label>
                <input type="url" id="creationImageUrl" placeholder="https://exemple.com/image.jpg" style="
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                ">
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancelCreationBtn" style="
                    padding: 0.8rem 1.5rem;
                    border: 2px solid #ddd;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">Annuler</button>
                <button id="saveCreationBtn" style="
                    padding: 0.8rem 1.5rem;
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">Ajouter</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestionnaires d'événements
    document.getElementById('saveCreationBtn').addEventListener('click', async () => {
        const title = document.getElementById('creationTitle').value.trim();
        const description = document.getElementById('creationDescription').value.trim();
        const category = document.getElementById('creationCategory').value;
        const imageUrl = document.getElementById('creationImageUrl').value.trim();
        
        if (!title) {
            alert('Veuillez entrer un titre');
            return;
        }
        
        try {
            const creation = {
                title,
                description,
                category,
                imageData: imageUrl || 'https://placehold.co/600x600?text=Création+Sinkolor'
            };
            
            if (firebaseService) {
                await firebaseService.addSinkolorCreation(creation);
            } else {
                // Fallback localStorage
                const existing = JSON.parse(localStorage.getItem('sinkolorCreations') || '[]');
                existing.push(creation);
                localStorage.setItem('sinkolorCreations', JSON.stringify(existing));
                renderSinkolorCreations(existing);
            }
            
            document.body.removeChild(modal);
        } catch (error) {
            console.error('Erreur lors de l\'ajout:', error);
            alert('Erreur lors de l\'ajout de la création');
        }
    });
    
    document.getElementById('cancelCreationBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Fonction pour éditer une création
async function editCreation(creationId) {
    // Implémentation de l'édition (similaire à l'ajout)
    console.log('Édition de la création:', creationId);
}

// Fonction pour supprimer une création
async function deleteCreation(creationId) {
    if (!confirm('Supprimer cette création ?')) return;
    
    try {
        if (firebaseService) {
            await firebaseService.deleteSinkolorCreation(creationId);
        } else {
            // Fallback localStorage
            const existing = JSON.parse(localStorage.getItem('sinkolorCreations') || '[]');
            const filtered = existing.filter(c => c.id !== creationId);
            localStorage.setItem('sinkolorCreations', JSON.stringify(filtered));
            renderSinkolorCreations(filtered);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initFlash();
    
    // Initialiser les créations Sinkolor si on est sur la page Sinkolor
    if (document.querySelector('.sinkolor-page') || window.location.pathname.includes('sinkolor')) {
        initSinkolorCreations();
    }
});


