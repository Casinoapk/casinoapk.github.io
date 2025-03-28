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
            --primary-color: #9b59b6; /* Фиолетовый - волшебство */
            --secondary-color: #e74c3c; /* Красный - энергия */
            --accent-color: #f1c40f; /* Желтый - веселье */
            --text-color: #2c3e50; /* Темно-синий - контраст */
            --light-color: #ecf0f1; /* Светло-серый */
            --dark-color: #34495e; /* Темно-синий */
            --magic-color: #1abc9c; /* Бирюзовый - магия */
            --shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            --magic-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Comic Sans MS', 'Arial', sans-serif;
        }
        
        body {
            color: var(--text-color);
            line-height: 1.6;
            background-color: var(--light-color);
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(155, 89, 182, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(231, 76, 60, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, rgba(241, 196, 15, 0.1) 0%, transparent 30%);
        }
        
        #app {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: var(--shadow);
            position: relative;
            z-index: 10;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(135deg, var(--accent-color), var(--magic-color));
            opacity: 0.7;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, var(--accent-color), white);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-family: 'Comic Sans MS', cursive;
        }
        
        .nav-list {
            display: flex;
            list-style: none;
        }
        
        .nav-list li {
            margin-left: 1.5rem;
            position: relative;
        }
        
        .nav-list li::after {
            content: '✨';
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .nav-list li:hover::after {
            opacity: 1;
        }
        
        .nav-list a {
            color: white;
            text-decoration: none;
            transition: all 0.3s;
            font-weight: bold;
            padding: 0.3rem 0;
            position: relative;
        }
        
        .nav-list a::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--accent-color);
            transition: width 0.3s;
        }
        
        .nav-list a:hover {
            color: var(--accent-color);
        }
        
        .nav-list a:hover::before {
            width: 100%;
        }
        
        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
            box-shadow: var(--shadow);
            position: relative;
            overflow: hidden;
        }
        
        .btn::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(45deg);
            transition: all 0.3s;
            opacity: 0;
        }
        
        .btn:hover::after {
            opacity: 1;
            left: 100%;
        }
        
        .login-btn {
            background-color: transparent;
            color: white;
            border: 2px solid white;
            margin-right: 0.5rem;
        }
        
        .login-btn:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .register-btn {
            background: linear-gradient(45deg, var(--accent-color), var(--magic-color));
            color: var(--text-color);
        }
        
        .register-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(241, 196, 15, 0.4);
        }
        
        .main-content {
            flex: 1;
            padding: 2rem;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 2rem;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, var(--primary-color), var(--magic-color));
            color: white;
            border-radius: 15px;
            box-shadow: var(--magic-shadow);
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(45deg, 
                var(--primary-color), 
                var(--magic-color), 
                var(--accent-color), 
                var(--secondary-color));
            background-size: 300% 300%;
            z-index: -1;
            border-radius: 20px;
            animation: gradientBG 8s ease infinite;
            opacity: 0.7;
        }
        
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            font-family: 'Comic Sans MS', cursive;
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 1.5rem;
        }
        
        .carousel {
            position: relative;
            margin: 3rem 0;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: var(--magic-shadow);
            border: 3px solid var(--accent-color);
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
            height: 500px;
            display: block;
            object-fit: cover;
        }
        
        .carousel-control {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 1.5rem;
            cursor: pointer;
            font-size: 2rem;
            z-index: 10;
            transition: all 0.3s;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .carousel-control:hover {
            background-color: var(--primary-color);
            transform: translateY(-50%) scale(1.1);
        }
        
        .carousel-control.prev {
            left: 20px;
        }
        
        .carousel-control.next {
            right: 20px;
        }
        
        .download-btn {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 40px;
            background: linear-gradient(45deg, var(--accent-color), var(--magic-color));
            color: var(--text-color);
            border: none;
            border-radius: 50px;
            font-size: 1.3rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            transition: all 0.3s;
            z-index: 20;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .download-btn:hover {
            background: linear-gradient(45deg, var(--magic-color), var(--accent-color));
            transform: translateX(-50%) scale(1.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .app-info {
            position: absolute;
            bottom: 110px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 25px;
            text-align: center;
            backdrop-filter: blur(5px);
        }
        
        .app-title {
            font-size: 2.2rem;
            margin-bottom: 10px;
            font-family: 'Comic Sans MS', cursive;
            color: var(--accent-color);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .app-description {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .feature {
            background-color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: var(--shadow);
            transition: all 0.3s;
            border-top: 5px solid var(--primary-color);
            position: relative;
            overflow: hidden;
        }
        
        .feature:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .feature::before {
            content: '🌟';
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.5rem;
            opacity: 0.3;
        }
        
        .feature h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-family: 'Comic Sans MS', cursive;
        }
        
        .feature p {
            color: var(--dark-color);
        }
        
        .footer {
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, var(--dark-color), var(--text-color));
            color: white;
            position: relative;
        }
        
        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, 
                var(--primary-color), 
                var(--secondary-color), 
                var(--accent-color), 
                var(--magic-color));
        }
        
        .footer p {
            margin-bottom: 1rem;
        }
        
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        
        .social-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 1.2rem;
            transition: all 0.3s;
            box-shadow: var(--shadow);
        }
        
        .social-icon:hover {
            transform: translateY(-3px) scale(1.1);
            color: var(--secondary-color);
        }
        
        .auth-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 0 30px rgba(155, 89, 182, 0.4);
            z-index: 1000;
            max-width: 400px;
            width: 90%;
            border: 3px solid var(--accent-color);
        }
        
        .auth-modal h2 {
            color: var(--primary-color);
            text-align: center;
            margin-bottom: 1.5rem;
            font-family: 'Comic Sans MS', cursive;
        }
        
        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .auth-form input {
            padding: 0.8rem 1rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .auth-form input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.2);
            outline: none;
        }
        
        .auth-form .btn {
            background: linear-gradient(45deg, var(--primary-color), var(--magic-color));
            color: white;
            padding: 0.8rem;
            font-size: 1.1rem;
            margin-top: 0.5rem;
        }
        
        .auth-form .btn:hover {
            background: linear-gradient(45deg, var(--magic-color), var(--primary-color));
        }
        
        .btn-back {
            background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
        }
        
        .btn-back:hover {
            background: linear-gradient(45deg, #c0392b, #e74c3c) !important;
        }
        
        /* Анимации и декоративные элементы */
        .magic-star {
            position: absolute;
            font-size: 1.2rem;
            animation: float 3s ease-in-out infinite;
            opacity: 0.7;
            z-index: -1;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        /* Мобильные стили */
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: flex-start;
                padding: 1rem;
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
            
            .nav-list li::after {
                display: none;
            }
            
            .auth-buttons {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-top: 1rem;
            }
            
            .btn {
                width: 48%;
                padding: 0.7rem;
            }
            
            .hero {
                padding: 2rem 1rem;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .carousel-image {
                height: 300px;
            }
            
            .download-btn {
                padding: 12px 25px;
                font-size: 1.1rem;
                bottom: 25px;
            }
            
            .app-info {
                bottom: 80px;
                padding: 15px;
            }
            
            .app-title {
                font-size: 1.6rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .carousel-control {
                width: 50px;
                height: 50px;
                padding: 1rem;
                font-size: 1.5rem;
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
