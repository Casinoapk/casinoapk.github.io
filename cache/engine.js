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
            --primary-color: #3498db;
            --secondary-color: #2980b9;
            --text-color: #333;
            --light-color: #f9f9f9;
            --dark-color: #222;
            --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            color: var(--text-color);
            line-height: 1.6;
            background-color: var(--light-color);
        }
        
        #app {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .header {
            background-color: var(--primary-color);
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: var(--shadow);
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
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
            transition: opacity 0.3s;
        }
        
        .nav-list a:hover {
            opacity: 0.8;
        }
        
        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .login-btn {
            background-color: transparent;
            color: white;
            border: 1px solid white;
            margin-right: 0.5rem;
        }
        
        .login-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .register-btn {
            background-color: white;
            color: var(--primary-color);
        }
        
        .register-btn:hover {
            background-color: #f0f0f0;
        }
        
        .main-content {
            flex: 1;
            padding: 2rem;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background-color: var(--secondary-color);
            color: white;
            border-radius: 8px;
            box-shadow: var(--shadow);
        }
        
        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .carousel {
            position: relative;
            margin: 2rem 0;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: var(--shadow);
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
            display: block;
            object-fit: cover;
        }
        .nav-btn {
            display: none;
        }
        .toggleMenu {
            display: none;
        }
        
        .carousel-control {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 1rem;
            cursor: pointer;
            font-size: 1.5rem;
            z-index: 10;
            transition: background-color 0.3s;
        }
        
        .carousel-control:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        .carousel-control.prev {
            left: 0;
            border-radius: 0 4px 4px 0;
        }
        
        .carousel-control.next {
            right: 0;
            border-radius: 4px 0 0 4px;
        }
        
        .download-btn {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 30px;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            z-index: 20;
        }
        
        .download-btn:hover {
            background-color: #27ae60;
            transform: translateX(-50%) scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .app-info {
            position: absolute;
            bottom: 90px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .app-title {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .feature {
            background-color: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow);
        }
        
        .feature h3 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .footer {
            text-align: center;
            padding: 1.5rem;
            background-color: var(--dark-color);
            color: white;
        }
        
        .auth-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            z-index: 100;
            max-width: 400px;
            width: 90%;
        }
        
        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .auth-form input {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        
        .auth-form .btn {
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem;
        }
        
        .auth-form .btn:hover {
            background-color: var(--secondary-color);
        }
        
        .btn-back {
            background-color: #e74c3c !important;
        }
        
        .btn-back:hover {
            background-color: #c0392b !important;
        }
        
        /* Мобильные стили */
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .nav {
                width: 100%;
                margin: 1rem 0;
            }
            
            .nav-list {
                display: none;
                flex-direction: column;
                width: 100%;
            }
            
            .nav-list.show {
                display: flex;
            }
            
            .nav-list li {
                margin: 0.5rem 0;
                margin-left: 0;
            }
            
            .auth-buttons {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            
            .btn {
                width: 48%;
                padding: 0.75rem;
            }
            
            .hero h1 {
                font-size: 1.8rem;
            }
            
            .carousel-image {
                height: 300px;
            }
            
            .download-btn {
                padding: 10px 20px;
                font-size: 1rem;
                bottom: 20px;
            }
            
            .app-info {
                bottom: 70px;
                padding: 15px;
            }
            
            .app-title {
                font-size: 1.4rem;
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
            
            let currentTransform = carouselInner.style.transform;
            let currentIndex = 0;
            
            if (currentTransform) {
                currentIndex = parseInt(currentTransform.match(/translateX\(-(.*?)%\)/)[1]) / 100;
            }
            
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 5000);
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