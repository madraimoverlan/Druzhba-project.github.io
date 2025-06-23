// Глобальные переменные
let currentUser = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    checkAuth();
    
    // Инициализируем формы
    initLoginForm();
    initRegisterForm();
    initAuthDropdown();
    
    // Инициализируем корзину
    updateCartCount();
});

// Проверка статуса авторизации
function checkAuth() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Обновляем кнопку входа
    updateAuthButton();
    
    // Если пользователь на странице входа/регистрации и уже авторизован - перенаправляем
    if ((window.location.pathname.includes('login.html') || 
         window.location.pathname.includes('register.html')) && currentUser) {
        window.location.href = 'account.html';
    }
    
    // Если пользователь на странице аккаунта и не авторизован - перенаправляем
    if (window.location.pathname.includes('account.html') && !currentUser) {
        window.location.href = 'login.html';
    }
}

// Обновление кнопки входа в хедере
function updateAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    const authBtnText = document.getElementById('auth-btn-text');
    const authDropdown = document.getElementById('auth-dropdown-content');
    
    if (!authBtn) return;
    
    if (currentUser) {
        // Пользователь авторизован
        const firstName = currentUser.name.split(' ')[0];
        authBtnText.textContent = firstName;
        
        // Обновляем dropdown меню
        if (authDropdown) {
            authDropdown.innerHTML = `
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
            const logoutBtn = authDropdown.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logoutUser();
                });
            }
        }
    } else {
        // Пользователь не авторизован
        authBtnText.textContent = 'Войти';
        
        // Обновляем dropdown меню
        if (authDropdown) {
            authDropdown.innerHTML = `
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

// Инициализация формы входа
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('login-remember').checked;
        
        loginUser(email, password, rememberMe);
    });
}

// Функция входа пользователя
function loginUser(email, password, rememberMe) {
    // Получаем список пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Ищем пользователя
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Авторизуем пользователя
        currentUser = user;
        
        // Сохраняем данные пользователя
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        
        // Обновляем интерфейс
        updateAuthButton();
        
        // Перенаправляем
        window.location.href = 'account.html';
    } else {
        showError('Неверный email или пароль');
    }
}

// Инициализация формы регистрации
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    
    if (!registerForm) return;
    
    // Валидация пароля
    const passwordInput = document.getElementById('register-password');
    const passwordStrength = document.getElementById('password-strength');
    
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value, passwordStrength);
        });
    }
    
    // Обработка отправки формы
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        const acceptTerms = document.getElementById('register-terms').checked;
        
        // Валидация
        if (!name || !email || !password || !confirmPassword) {
            showError('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('Пароли не совпадают');
            return;
        }
        
        if (password.length < 6) {
            showError('Пароль должен содержать минимум 6 символов');
            return;
        }
        
        if (!acceptTerms) {
            showError('Необходимо принять условия использования');
            return;
        }
        
        // Проверяем, не зарегистрирован ли уже email
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(u => u.email === email);
        
        if (emailExists) {
            showError('Пользователь с таким email уже зарегистрирован');
            return;
        }
        
        // Создаем нового пользователя
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            registrationDate: new Date().toISOString(),
            addresses: [],
            orders: [],
            wishlist: []
        };
        
        // Добавляем пользователя в базу
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Авторизуем пользователя
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Обновляем интерфейс
        updateAuthButton();
        
        // Перенаправляем в личный кабинет
        window.location.href = 'account.html';
    });
}

// Обновление индикатора сложности пароля
function updatePasswordStrength(password, element) {
    if (!password) {
        element.className = 'password-strength';
        return;
    }
    
    // Простая проверка сложности
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    element.className = 'password-strength';
    if (strength < 2) {
        element.classList.add('weak');
    } else if (strength < 4) {
        element.classList.add('medium');
    } else {
        element.classList.add('strong');
    }
}

// Выход пользователя
function logoutUser() {
    // Удаляем данные пользователя
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    currentUser = null;
    
    // Обновляем интерфейс
    updateAuthButton();
    
    // Перенаправляем на главную
    window.location.href = 'main.html';
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
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
    
    // Автоскрытие через 5 секунд
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Обновление счетчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}