document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    checkAuth();
    
    // Инициализируем компоненты
    initAccountTabs();
    initProfileForm();
    initPasswordForm();
    initAddressForm();
    initLogout();
    initDeleteAccount();
    
    // Загружаем данные
    loadProfileData();
    loadOrders();
    loadAddresses();
    loadWishlist();
});

// Проверка авторизации
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

// Инициализация вкладок
function initAccountTabs() {
    const tabs = document.querySelectorAll('.account-nav-link');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            if (this.hash === '#logout') return;
            
            e.preventDefault();
            
            // Удаляем active у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем active текущей вкладке
            this.classList.add('active');
            
            // Скрываем все разделы
            const sections = document.querySelectorAll('.account-section');
            sections.forEach(s => s.classList.remove('active'));
            
            // Показываем выбранный раздел
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Загрузка данных профиля
function loadProfileData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) return;
    
    // Заполняем данные профиля
    document.getElementById('account-name').textContent = currentUser.name;
    document.getElementById('account-email').textContent = currentUser.email;
    document.getElementById('account-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    // Заполняем форму профиля
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    
    if (currentUser.phone) {
        document.getElementById('profile-phone').value = currentUser.phone;
    }
    
    if (currentUser.birthday) {
        document.getElementById('profile-birthday').value = currentUser.birthday;
    }
    
    if (currentUser.newsletter) {
        document.getElementById('profile-newsletter').checked = currentUser.newsletter;
    }
}

// Инициализация формы профиля
function initProfileForm() {
    const form = document.getElementById('profile-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем текущего пользователя
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                         JSON.parse(sessionStorage.getItem('currentUser'));
        
        if (!currentUser) return;
        
        // Получаем данные формы
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        const phone = document.getElementById('profile-phone').value;
        const birthday = document.getElementById('profile-birthday').value;
        const newsletter = document.getElementById('profile-newsletter').checked;
        
        // Обновляем данные пользователя
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.birthday = birthday;
        currentUser.newsletter = newsletter;
        
        // Сохраняем изменения
        saveUserChanges(currentUser);
        
        // Показываем сообщение об успехе
        showSuccess('Данные успешно сохранены');
    });
}

// Инициализация формы смены пароля
function initPasswordForm() {
    const form = document.getElementById('password-form');
    
    if (!form) return;
    
    // Валидация пароля
    const passwordInput = document.getElementById('new-password');
    const passwordStrength = document.getElementById('new-password-strength');
    
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value, passwordStrength);
        });
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем текущего пользователя
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                         JSON.parse(sessionStorage.getItem('currentUser'));
        
        if (!currentUser) return;
        
        // Получаем данные формы
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Проверяем текущий пароль
        if (currentPassword !== currentUser.password) {
            showError('Текущий пароль неверен');
            return;
        }
        
        // Проверяем новый пароль
        if (newPassword !== confirmPassword) {
            showError('Новые пароли не совпадают');
            return;
        }
        
        if (newPassword.length < 6) {
            showError('Пароль должен содержать минимум 6 символов');
            return;
        }
        
        // Обновляем пароль
        currentUser.password = newPassword;
        
        // Сохраняем изменения
        saveUserChanges(currentUser);
        
        // Очищаем форму
        form.reset();
        
        // Показываем сообщение об успехе
        showSuccess('Пароль успешно изменен');
    });
}

// Инициализация формы адресов
function initAddressForm() {
    const addBtn = document.getElementById('add-address-btn');
    const modal = document.getElementById('address-modal');
    const closeModal = modal.querySelector('.close-modal');
    const form = document.getElementById('address-form');
    
    if (!addBtn || !modal) return;
    
    // Открытие модального окна
    addBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем текущего пользователя
            let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                             JSON.parse(sessionStorage.getItem('currentUser'));
            
            if (!currentUser) return;
            
            // Получаем данные формы
            const address = {
                id: Date.now(),
                name: document.getElementById('address-name').value,
                country: document.getElementById('address-country').value,
                city: document.getElementById('address-city').value,
                street: document.getElementById('address-street').value,
                zip: document.getElementById('address-zip').value,
                phone: document.getElementById('address-phone').value,
                isDefault: document.getElementById('address-default').checked,
                createdAt: new Date().toISOString()
            };
            
            // Если это основной адрес, снимаем флаги с других
            if (address.isDefault) {
                currentUser.addresses.forEach(a => a.isDefault = false);
            }
            
            // Добавляем адрес
            if (!currentUser.addresses) {
                currentUser.addresses = [];
            }
            
            currentUser.addresses.push(address);
            
            // Сохраняем изменения
            saveUserChanges(currentUser);
            
            // Закрываем модальное окно
            modal.style.display = 'none';
            
            // Обновляем список адресов
            loadAddresses();
            
            // Показываем сообщение об успехе
            showSuccess('Адрес успешно добавлен');
        });
    }
}

// Загрузка заказов
function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    
    if (!ordersList) return;
    
    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.orders || currentUser.orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-message">У вас пока нет заказов</p>';
        return;
    }
    
    // Отображаем заказы
    ordersList.innerHTML = currentUser.orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-number">Заказ #${order.id}</span>
                <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                <span class="order-status">${order.status}</span>
            </div>
            <div class="order-products">
                ${order.items.map(item => `
                    <div class="order-product">
                        <img src="${item.image}" alt="${item.name}" class="order-product-image">
                        <div class="order-product-info">
                            <h4>${item.name}</h4>
                            <p>${item.price} × ${item.quantity}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <span class="order-total">Итого: ${order.total}₽</span>
                <button class="btn btn--secondary">Повторить заказ</button>
            </div>
        </div>
    `).join('');
}

// Загрузка адресов
function loadAddresses() {
    const addressesList = document.getElementById('addresses-list');
    
    if (!addressesList) return;
    
    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.addresses || currentUser.addresses.length === 0) {
        addressesList.innerHTML = '<p class="empty-message">У вас нет сохраненных адресов</p>';
        return;
    }
    
    // Отображаем адреса
    addressesList.innerHTML = currentUser.addresses.map(address => `
        <div class="address-card">
            ${address.isDefault ? '<span class="address-default">По умолчанию</span>' : ''}
            <h4>${address.name}</h4>
            <p>${address.street}, ${address.city}, ${address.country}</p>
            <p>${address.phone}</p>
            <div class="address-actions">
                <button class="btn btn--secondary btn-sm edit-address" data-id="${address.id}">Изменить</button>
                <button class="btn btn--outline btn-sm delete-address" data-id="${address.id}">Удалить</button>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики для кнопок
    document.querySelectorAll('.edit-address').forEach(btn => {
        btn.addEventListener('click', function() {
            // Реализация редактирования адреса
            alert('Редактирование адреса будет реализовано в следующей версии');
        });
    });
    
    document.querySelectorAll('.delete-address').forEach(btn => {
        btn.addEventListener('click', function() {
            const addressId = parseInt(this.getAttribute('data-id'));
            deleteAddress(addressId);
        });
    });
}

// Удаление адреса
function deleteAddress(addressId) {
    // Получаем текущего пользователя
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                     JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.addresses) return;
    
    // Удаляем адрес
    currentUser.addresses = currentUser.addresses.filter(a => a.id !== addressId);
    
    // Сохраняем изменения
    saveUserChanges(currentUser);
    
    // Обновляем список адресов
    loadAddresses();
    
    // Показываем сообщение об успехе
    showSuccess('Адрес успешно удален');
}

// Загрузка избранного
function loadWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    
    if (!wishlistItems) return;
    
    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.wishlist || currentUser.wishlist.length === 0) {
        wishlistItems.innerHTML = '<p class="empty-message">В избранном пока ничего нет</p>';
        return;
    }
    
    // Отображаем избранное
    wishlistItems.innerHTML = currentUser.wishlist.map(item => `
        <div class="wishlist-item">
            <button class="remove-wishlist" data-id="${item.id}">×</button>
            <img src="${item.image}" alt="${item.name}" class="wishlist-image">
            <h4>${item.name}</h4>
            <p>${item.price}₽</p>
            <button class="btn btn--primary btn-sm">В корзину</button>
        </div>
    `).join('');
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeFromWishlist(itemId);
        });
    });
}

// Удаление из избранного
function removeFromWishlist(itemId) {
    // Получаем текущего пользователя
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                     JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.wishlist) return;
    
    // Удаляем товар
    currentUser.wishlist = currentUser.wishlist.filter(item => item.id !== itemId);
    
    // Сохраняем изменения
    saveUserChanges(currentUser);
    
    // Обновляем список избранного
    loadWishlist();
    
    // Показываем сообщение об успехе
    showSuccess('Товар удален из избранного');
}

// Инициализация кнопки выхода
function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });
}

// Инициализация удаления аккаунта
function initDeleteAccount() {
    const deleteBtn = document.getElementById('delete-account-btn');
    const modal = document.getElementById('delete-modal');
    const cancelBtn = document.getElementById('cancel-delete');
    const confirmBtn = document.getElementById('confirm-delete');
    
    if (!deleteBtn || !modal) return;
    
    // Открытие модального окна
    deleteBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    
    // Закрытие модального окна
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Подтверждение удаления
    confirmBtn.addEventListener('click', function() {
        deleteAccount();
    });
}

// Удаление аккаунта
function deleteAccount() {
    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) return;
    
    // Получаем список пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Удаляем пользователя из списка
    const updatedUsers = users.filter(u => u.id !== currentUser.id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Удаляем данные пользователя
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Перенаправляем на главную
    window.location.href = 'index.html';
}

// Сохранение изменений пользователя
function saveUserChanges(user) {
    // Обновляем текущего пользователя
    if (localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // Обновляем в списке пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Обновление сложности пароля
function updatePasswordStrength(password, element) {
    if (!password) {
        element.className = 'password-strength';
        return;
    }
    
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
    
    // Перенаправляем на главную
    window.location.href = 'index.html';
}

// Показ сообщения об успехе
function showSuccess(message) {
    // Удаляем предыдущие сообщения
    const existingMessages = document.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Создаем элемент с сообщением
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    // Добавляем сообщение перед формой
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(successElement, form);
    } else {
        const section = document.querySelector('.account-section.active');
        if (section) {
            section.insertBefore(successElement, section.firstChild);
        }
    }
    
    // Автоскрытие через 5 секунд
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

// Показ ошибки
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