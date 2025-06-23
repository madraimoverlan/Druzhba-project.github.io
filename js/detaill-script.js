document.addEventListener('DOMContentLoaded', function() {
    // Инициализация галереи
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Удаляем активный класс у всех миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей миниатюре
            this.classList.add('active');
            // Меняем основное изображение
            mainImage.src = this.dataset.image;
        });
    });
    
    // Выбор цвета
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            // Здесь можно добавить логику смены изображений при выборе цвета
        });
    });
    
    // Выбор размера
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Навигация по табам
    const tabButtons = document.querySelectorAll('.details-nav-btn');
    const tabs = document.querySelectorAll('.details-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Убираем активный класс у всех кнопок и табов
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и табу
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Добавление в корзину
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        // Получаем выбранные параметры
        const selectedColor = document.querySelector('.color-option.active').dataset.color;
        const selectedSize = document.querySelector('.size-option.active').textContent;
        
        // Создаем объект товара
        const product = {
            id: 1, // ID товара
            name: document.querySelector('.product-title').textContent,
            price: parseInt(document.querySelector('.current-price').textContent.replace(/\D/g, '')),
            oldPrice: parseInt(document.querySelector('.old-price').textContent.replace(/\D/g, '')),
            image: mainImage.src,
            color: selectedColor,
            size: selectedSize,
            quantity: 1
        };
        
        // Добавляем в корзину (используем функцию из cart.js)
        addToCart(product);
        
        // Анимация добавления
        this.textContent = '✓ Добавлено';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = 'Добавить в корзину';
            this.style.backgroundColor = '';
        }, 2000);
    });
    
    // Добавление в избранное
    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    addToFavoritesBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="var(--primary-color)" stroke-width="2"/>
                </svg>
                В избранном
            `;
        } else {
            this.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                В избранное
            `;
        }
    });
    
    // Модальное окно отзывов
    const reviewModal = document.getElementById('review-modal');
    const writeReviewBtn = document.getElementById('write-review');
    const modalClose = document.querySelector('.modal-close');
    const stars = document.querySelectorAll('.star');
    
    writeReviewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        reviewModal.classList.add('active');
    });
    
    modalClose.addEventListener('click', function() {
        reviewModal.classList.remove('active');
    });
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
        });
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
        }
    });
    
    // Функция добавления в корзину (аналогичная той, что в cart.js)
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Обновление счетчика корзины
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }
    
    // Инициализация счетчика
    updateCartCount();
});