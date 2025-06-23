// Данные товаров
const allDeals = [
    { id: 1, name: "Дубленка овчинная", oldPrice: "12500P", price: "9000", image: "img/дубленка.jpg" },
    { id: 2, name: "Шерстяное Пальто", oldPrice: "12500P", price: "10000P", image: "img/Fashion wool coat -8.png" },
    { id: 3, name: "Повседневное платье-рубашка", oldPrice: "2500P", price: "3000Р", image: "img/dress5.webp" },
    { id: 4, name: "Брюки женские", oldPrice: "2500", price: "2000", image: "img/брюки.jpg" },
    { id: 5, name: "Платье Миди", oldPrice: "8500P", price: "7000P", image: "img/dress13.jpg" },
    { id: 6, name: "Джинсы Slim", oldPrice: "6000P", price: "4500P", image: "img/jeansslim.webp" },
    { id: 7, name: "Футболка Oversize", oldPrice: "3000P", price: "2000P", image: "img/t-shirt1.jpg" },
    { id: 8, name: "Куртка Кожаная", oldPrice: "15000P", price: "12000P", image: "img/Fashion wool coat -8.png" }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let visibleDeals = 4;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderDeals();
    updateCartCount();
    initAuthDropdown();
    checkAuthStatus();
});

// Отображение товаров
function renderDeals() {
    const dealsGrid = document.getElementById('deals-grid');
    if (!dealsGrid) return;
    
    const dealsToShow = allDeals.slice(0, visibleDeals);
    
    dealsGrid.innerHTML = dealsToShow.map(deal => `
        <article class="deal-card">
            <div class="deal-card__image-wrapper">
                <img src="${deal.image}" alt="${deal.name}" class="deal-card__image" loading="lazy">
            </div>
            <div class="deal-card__content">
                <h3 class="deal-card__title">${deal.name}</h3>
                <div class="deal-card__prices">
                    <span class="deal-card__old-price">${deal.oldPrice}</span>
                    <span class="deal-card__price">${deal.price}</span>
                </div>
                <button class="btn btn--secondary add-to-cart" data-id="${deal.id}">В корзину</button>
            </div>
        </article>
    `).join('');

    // Обновляем обработчики событий
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Кнопка "Показать еще"
    const showMoreButton = document.querySelector('.show-more');
    if (showMoreButton) {
        showMoreButton.style.display = visibleDeals >= allDeals.length ? 'none' : 'block';
    }
}

// Добавление в корзину
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = allDeals.find(item => item.id === productId);
    
    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик корзины
    updateCartCount();
    
    // Анимация добавления
    animateAddToCart(event.target);
}

// Анимация добавления в корзину
function animateAddToCart(button) {
    const originalText = button.textContent;
    const originalBg = button.style.backgroundColor;
    
    button.textContent = '✓ Добавлено';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBg;
    }, 2000);
}

// Обновление счетчика корзины
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Обработчик кнопки "Показать еще"
const showMoreButton = document.querySelector('.show-more');
if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
        visibleDeals += 4;
        renderDeals();
        
        // Плавная прокрутка к новым товарам
        setTimeout(() => {
            document.querySelector('.show-more').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 300);
    });
}

// Инициализация dropdown меню авторизации
function initAuthDropdown() {
    const authBtn = document.getElementById('auth-btn');
    const authDropdown = document.getElementById('auth-dropdown');
    
    if (!authBtn || !authDropdown) return;
    
    // Открытие/закрытие dropdown
    authBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        authDropdown.classList.toggle('show');
        updateAuthDropdownContent();
    });
    
    // Закрытие dropdown при клике вне его
    document.addEventListener('click', function() {
        authDropdown.classList.remove('show');
    });
    
    // Предотвращаем закрытие при клике внутри dropdown
    authDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Обновление содержимого dropdown меню
function updateAuthDropdownContent() {
    const dropdownContent = document.getElementById('auth-dropdown-content');
    if (!dropdownContent) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Пользователь авторизован
        const firstName = currentUser.name.split(' ')[0];
        dropdownContent.innerHTML = `
            <div class="user-profile">
                <div class="user-avatar">${firstName.charAt(0).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name">${currentUser.name}</div>
                    <div class="user-email">${currentUser.email}</div>
                </div>
            </div>
            <div class="user-menu">
                <a href="account.html">Мой профиль</a>
                <a href="account.html#orders">Мои заказы</a>
                <a href="account.html#wishlist">Избранное</a>
                <a href="#" class="logout-btn">Выйти</a>
            </div>
        `;
        
        // Добавляем обработчик выхода
        const logoutBtn = dropdownContent.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    } else {
        // Пользователь не авторизован
        dropdownContent.innerHTML = `
            <form class="dropdown-form" id="dropdown-login-form">
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Пароль" required>
                </div>
                <button type="submit" class="btn btn--primary">Войти</button>
            </form>
            <div class="dropdown-links">
                <a href="register.html">Создать аккаунт</a>
                <a href="forgot-password.html">Забыли пароль?</a>
            </div>
        `;
        
        // Инициализируем форму входа в dropdown
        const dropdownForm = document.getElementById('dropdown-login-form');
        if (dropdownForm) {
            dropdownForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                const password = this.querySelector('input[type="password"]').value;
                loginUser(email, password, true);
            });
        }
    }
}

// Функция входа пользователя
function loginUser(email, password, rememberMe) {
    // Получаем список пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Ищем пользователя
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Авторизуем пользователя
        const currentUser = user;
        
        // Сохраняем данные пользователя
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        // Обновляем интерфейс
        checkAuthStatus();
        
        // Закрываем dropdown
        const authDropdown = document.getElementById('auth-dropdown');
        if (authDropdown) {
            authDropdown.classList.remove('show');
        }
        
        // Перенаправляем если находимся на странице входа
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'account.html';
        }
    } else {
        showError('Неверный email или пароль');
    }
}

// Выход пользователя
function logoutUser() {
    // Удаляем данные пользователя
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Обновляем интерфейс
    checkAuthStatus();
    
    // Перенаправляем если находимся в личном кабинете
    if (window.location.pathname.includes('account.html')) {
        window.location.href = 'main.html';
    }
}

// Проверка статуса авторизации
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    const authBtnText = document.getElementById('auth-btn-text');
    
    if (currentUser && authBtnText) {
        // Пользователь авторизован
        const firstName = currentUser.name.split(' ')[0];
        authBtnText.textContent = firstName;
    } else if (authBtnText) {
        // Пользователь не авторизован
        authBtnText.textContent = 'Войти';
    }
    
    // Для страницы account.html
    if (document.querySelector('.account-container')) {
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('account-name').textContent = currentUser.name;
            document.getElementById('account-email').textContent = currentUser.email;
            
            // Переключение между разделами
            document.querySelectorAll('.account-nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.hash === '#logout') return;
                    
                    e.preventDefault();
                    
                    // Удаляем active у всех ссылок и разделов
                    document.querySelectorAll('.account-nav-link').forEach(el => el.classList.remove('active'));
                    document.querySelectorAll('.account-section').forEach(el => el.classList.remove('active'));
                    
                    // Добавляем active текущей ссылке
                    this.classList.add('active');
                    
                    // Показываем соответствующий раздел
                    const sectionId = this.getAttribute('href').substring(1);
                    document.getElementById(sectionId).classList.add('active');
                });
            });
        }
    }
}

// Показ сообщения об ошибке
function showError(message) {
    // Удаляем предыдущие сообщения
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Создаем элемент с ошибкой
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message show';
    errorElement.textContent = message;
    
    // Добавляем ошибку перед кнопкой отправки формы
    const form = document.querySelector('form');
    if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        form.insertBefore(errorElement, submitButton);
    }
    
    // Автоскрытие через 5 секунд
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}