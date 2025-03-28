class SiteEngine {
    constructor() {
        this.cache = {
            css: {},
            js: {},
            templates: {}
        };
        
        this.currentView = 'main';
        this.isMobile = window.innerWidth <= 768;
        this.carouselItems = this.generateCarouselItems(16);
        this.carouselInterval = null;
        
        this.init();
    }
    
    generateCarouselItems(count) {
        const items = [];
        const colors = [
            '#3498db', '#e74c3c', '#2ecc71', '#f39c12', 
            '#9b59b6', '#1abc9c', '#d35400', '#34495e',
            '#16a085', '#c0392b', '#2980b9', '#8e44ad',
            '#27ae60', '#d35400', '#f1c40f', '#7f8c8d'
        ];
        
        for (let i = 1; i <= count; i++) {
            items.push({
                id: i,
                title: `Приложение ${i}`,
                description: `Уникальные функции и возможности приложения ${i}`,
                color: colors[i - 1],
                apkPath: `app/${i}.apk`
            });
        }
        return items;
    }
    
    init() {
        this.cacheCSS();
        this.cacheTemplates();
        this.render();
        this.setupEventListeners();
        
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    handleResize() {
        const newIsMobile = window.innerWidth <= 768;
        if (this.isMobile !== newIsMobile) {
            this.isMobile = newIsMobile;
            this.render();
        }
    }
    
    cacheCSS() {
        this.cache.css.main = `
        :root {
    --primary-color: #ff6bcb;
    --secondary-color: #ffde59;
    --accent-color: #6b5bff;
    --text-color: #ffffff;
    --light-color: #fdf3f3;
    --dark-color: #222;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    --glow: 0 0 10px rgba(255, 107, 203, 0.8);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    color: var(--text-color);
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    background-attachment: fixed;
    transition: background 0.5s ease-in-out;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
    border-bottom: 2px solid var(--secondary-color);
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: var(--glow);
    animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
    from { text-shadow: var(--glow); }
    to { text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 30px var(--primary-color); }
}

.nav-list {
    display: flex;
    list-style: none;
}

.nav-list li {
    margin-left: 1.5rem;
}

.nav-list a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s;
    position: relative;
}

.nav-list a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-list a:hover::after {
    width: 100%;
}

.btn {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
    box-shadow: var(--shadow);
}

.login-btn {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.login-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.register-btn {
    background: var(--secondary-color);
    color: var(--dark-color);
    transition: background 0.3s ease-in-out;
}

.register-btn:hover {
    background: #ffd700;
}

.main-content {
    flex: 1;
    padding: 2rem;
    text-align: center;
}

.hero {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    text-shadow: var(--glow);
    animation: pulse 2s infinite alternate;
}

@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.02); }
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.carousel {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: var(--shadow);
    border: 2px solid var(--primary-color);
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-item {
    min-width: 100%;
    position: relative;
}

.carousel-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.3);
    color: var(--dark-color);
    padding: 1rem;
    font-size: 2rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.carousel-control:hover {
    background: var(--secondary-color);
    transform: translateY(-50%) scale(1.1);
}

.download-btn {
    padding: 14px 35px;
    background: var(--secondary-color);
    color: var(--dark-color);
    font-size: 1.2rem;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 206, 84, 0.7);
    transition: all 0.3s;
}

.download-btn:hover {
    background: #ffd700;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 206, 84, 0.9);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
}

.feature {
    background: linear-gradient(135deg, var(--light-color), #ffe4e1);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(255, 206, 84, 0.7);
}

.feature h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    text-shadow: var(--glow);
}

.footer {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(90deg, var(--dark-color), #444);
    color: white;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    .carousel-image {
        height: 300px;
    }
    .features {
        grid-template-columns: 1fr;
    }
}


        
    `;
        
        const style = document.createElement('style');
        style.textContent = this.cache.css.main;
        document.head.appendChild(style);
    }
    
    cacheTemplates() {
        this.cache.templates.main = document.getElementById('main-template').content;
        this.cache.templates.login = document.getElementById('login-template').content;
        this.cache.templates.register = document.getElementById('register-template').content;
    }
    
    renderCarouselItems() {
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';
        
        this.carouselItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            itemDiv.innerHTML = `
                <div class="carousel-item-content">
                    <div class="carousel-image" style="background-color: ${item.color}">
                        <div class="image-text">${item.title}</div>
                    </div>
                    <div class="app-info">
                        <h3 class="app-title">${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                    <button class="download-btn" data-apk="${item.apkPath}">
                        Скачать APK
                    </button>
                </div>
            `;
            
            carouselInner.appendChild(itemDiv);
        });
    }
    
    render() {
        const app = document.getElementById('app');
        app.innerHTML = '';
        
        const template = this.cache.templates[this.currentView];
        if (template) {
            app.appendChild(document.importNode(template, true));
        }
        
        if (this.currentView === 'main') {
            this.renderCarouselItems();
            this.initCarousel();
        }
    }
    
    initCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        
        let currentIndex = 0;
        const itemCount = items.length;
        
        const updateCarousel = () => {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
            updateCarousel();
            this.resetAutoScroll();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateCarousel();
            this.resetAutoScroll();
        });
        
        this.startAutoScroll();
    }
    
startAutoScroll() {
    if (this.carouselInterval) {
        clearInterval(this.carouselInterval);
    }

    this.carouselInterval = setInterval(() => {
        const carouselInner = document.querySelector('.carousel-inner');
        const items = document.querySelectorAll('.carousel-item');

        let currentIndex = 0;
        let currentTransform = carouselInner.style.transform;

        if (currentTransform) {
            const match = currentTransform.match(/translateX\(-(\d+)%\)/);
            if (match) {
                currentIndex = parseInt(match[1]) / 100;
            }
        }

        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 250);
}
    
    resetAutoScroll() {
        clearInterval(this.carouselInterval);
        this.startAutoScroll();
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-btn')) {
                this.showAuth('login');
            } else if (e.target.classList.contains('register-btn')) {
                this.showAuth('register');
            } else if (e.target.classList.contains('btn-back')) {
                this.showMain();
            } else if (e.target.classList.contains('nav-btn')) {
                this.toggleMenu();
            } else if (e.target.classList.contains('download-btn')) {
                this.handleDownload(e.target);
            }
        });
        
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('auth-form')) {
                e.preventDefault();
                this.handleAuthSubmit();
            }
        });
    }
    
    showAuth(view) {
        this.currentView = view;
        this.render();
        clearInterval(this.carouselInterval);
    }
    
    showMain() {
        this.currentView = 'main';
        this.render();
    }
    
    toggleMenu() {
        const navList = document.getElementById('nav-list');
        if (navList) {
            navList.classList.toggle('show');
        }
    }
    
    handleDownload(button) {
        const apkPath = button.getAttribute('data-apk');
        this.downloadApk(apkPath);
    }
    
    handleAuthSubmit() {
        alert('Форма отправлена!');
        this.showMain();
    }
    
    downloadApk(apkPath) {
        // В реальном проекте здесь должно быть реальное скачивание
        console.log(`Скачивание APK: ${apkPath}`);
        alert(`Скачивание: ${apkPath.split('/').pop()}`);
        
        // Эмуляция скачивания
        const link = document.createElement('a');
        link.href = apkPath;
        link.download = apkPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    destroy() {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.carouselInterval);
    }
}

// Инициализация движка
document.addEventListener('DOMContentLoaded', () => {
    window.siteEngine = new SiteEngine();
});
