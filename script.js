// ATS Tubarões - JavaScript Moderno e Otimizado

// Performance: usar requestAnimationFrame para animações
let ticking = false;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initSmoothScrolling();
    initNavbarScrollEffect();
    initScrollAnimations();
    initMobileMenu();
    initLazyLoading();
    initPerformanceOptimizations();
});

// Otimização de performance
function initPerformanceOptimizations() {
    // Preload de imagens críticas
    const criticalImages = ['imagem/ats-tubaroes.jpg', 'imagem/ats-tubaroes-white.jpg'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Debounce para scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, 10);
    });
    
}


// Função para smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                closeMobileMenu();
            }
        });
    });
}

// Função para efeito da navbar ao rolar (otimizada)
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.borderBottom = '1px solid rgba(255, 107, 53, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
        ticking = false;
    }
    
    window.updateNavbar = updateNavbar;
}

// Função para animações de entrada (melhorada)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Parar de observar após animação
            }
        });
    }, observerOptions);

    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.feature-card, .class-card, .about-content, .info-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Adicionar classe CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}


// Lazy loading para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Função para menu mobile (preparado para futuras implementações)
function initMobileMenu() {
    // Criar botão hambúrguer para mobile
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.className = 'hamburger';
        hamburger.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        nav.appendChild(hamburger);
    }
}

// Função para destacar link ativo na navegação
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Função para atualizar efeitos de scroll (otimizada)
function updateScrollEffects() {
    if (window.updateNavbar) {
        window.updateNavbar();
    }
    setActiveNavLink();
    ticking = false;
}

// Inicializar destaque de link ativo
setActiveNavLink();

// Função para mostrar/ocultar botão "voltar ao topo"
function initBackToTop() {
    // Criar botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff6b35, #f7931e);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botão de voltar ao topo
initBackToTop();

// Função para fechar menu mobile (usada em outras funções)
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}
