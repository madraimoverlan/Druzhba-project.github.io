// Данные товаров (те же, что в каталоге)
const productsData = [
    { id: 1, name: "Шерстяное пальто", category: "coats", size: ["S", "M", "L"], price: 10000, oldPrice: 12500, isNew: true, image: "img/Fashion wool coat -8.png" },
    // ... другие товары
];

// Промокоды
const promoCodes = {
    "FRIEND10": { discount: 10, type: "percent" },
    "WELCOME20": { discount: 20, type: "percent", minOrder: 5000 },
    "FREESHIP": { discount: 500, type: "fixed", freeShipping: true },
    "SUMMER15": { discount: 15, type: "percent" }
};

// Состояние корзины
const state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    appliedPromo: null,
    recommendedProducts: []
};

// DOM элементы
const elements = {
    cartItems: document.getElementById('cart-items'),
    cartCount: document.getElementById('cart-count'),
    cartItemsCount: document.getElementById('cart-items-count'),
    summaryItemsPrice: document.getElementById('summary-items-price'),
    summaryDiscount: document.getElementById('summary-discount'),
    summaryDelivery: document.getElementById('summary-delivery'),
    summaryTotal: document.getElementById('summary-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    promoCode: document.getElementById('promo-code'),
    applyPromo: document.getElementById('apply-promo'),
    promoHint: document.getElementById('promo-hint'),
    recommendedGrid: document.getElementById('recommended-grid')
};

// Инициализация корзины
function initCart() {
    renderCart();
    updateCartSummary();
    loadRecommendedProducts();
    setupEventListeners();
}

// Рендер корзины
function renderCart() {
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty__icon">🛒</div>
                <h2 class="cart-empty__title">Ваша корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
                <a href="catalog.html" class="btn btn--primary" style="margin-top: 20px;">Перейти в каталог</a>
            </div>
        `;
        elements.checkoutBtn.disabled = true;
        return;
    }

    elements.cartItems.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item__image">
            <div class="cart-item__content">
                <div>
                    <h3 class="cart-item__title">${item.name}</h3>
                    <div class="cart-item__prices">
                        <span class="cart-item__price">${item.price.toLocaleString()} ₽</span>
                        ${item.oldPrice ? `<span class="cart-item__old-price">${item.oldPrice.toLocaleString()} ₽</span>` : ''}
                    </div>
                </div>
                <div class="cart-item__size">Размер: ${item.selectedSize || 'M'}</div>
            </div>
            <div class="cart-item__actions">
                <button class="cart-item__remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Удалить
                </button>
                <div class="cart-item__quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
        </div>
    `).join('');

    updateCartCount();
}

// Обновление счетчика корзины
function updateCartCount() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartItemsCount.textContent = `${totalItems} ${pluralize(totalItems, ['товар', 'товара', 'товаров'])}`;
}

// Обновление итоговой информации
function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    let delivery = 500; // Базовая стоимость доставки
    
    // Применение промокода
    if (state.appliedPromo) {
        const promo = promoCodes[state.appliedPromo];
        
        if (promo.type === "percent") {
            discount = subtotal * (promo.discount / 100);
        } else {
            discount = promo.discount;
        }
        
        if (promo.freeShipping) {
            delivery = 0;
        }
    }
    
    // Бесплатная доставка при заказе от 5000 ₽
    if (subtotal - discount >= 5000) {
        delivery = 0;
    }
    
    const total = subtotal - discount + delivery;
    
    elements.summaryItemsPrice.textContent = `${subtotal.toLocaleString()} ₽`;
    elements.summaryDiscount.textContent = `-${discount.toLocaleString()} ₽`;
    elements.summaryDelivery.textContent = delivery === 0 ? "Бесплатно" : `${delivery.toLocaleString()} ₽`;
    elements.summaryTotal.textContent = `${total.toLocaleString()} ₽`;
}

// Загрузка рекомендуемых товаров
function loadRecommendedProducts() {
    // В реальном приложении здесь был бы запрос к API
    // Сейчас просто берем 4 случайных товара, которых нет в корзине
    const inCartIds = state.cart.map(item => item.id);
    state.recommendedProducts = productsData
        .filter(product => !inCartIds.includes(product.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
    renderRecommendedProducts();
}

// Рендер рекомендуемых товаров
function renderRecommendedProducts() {
    elements.recommendedGrid.innerHTML = state.recommendedProducts.map(product => `
        <article class="product-card">
            ${product.isNew ? '<span class="product-card__badge">Новинка</span>' : ''}
            <div class="product-card__image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy">
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__price">
                    <span class="product-card__current-price">${product.price.toLocaleString()} ₽</span>
                    ${product.oldPrice ? `<span class="product-card__old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}
                </div>
                <div class="product-card__actions">
                    <button class="btn btn--secondary add-to-cart" data-id="${product.id}">В корзину</button>
                    <button class="btn btn--outline quick-view" data-id="${product.id}">Подробнее</button>
                </div>
            </div>
        </article>
    `).join('');
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Удаление товара
    elements.cartItems.addEventListener('click', (e) => {
        if (e.target.closest('.cart-item__remove')) {
            const itemElement = e.target.closest('.cart-item');
            const itemId = parseInt(itemElement.dataset.id);
            removeFromCart(itemId);
        }
    });
    
    // Изменение количества
    elements.cartItems.addEventListener('click', (e) => {
        const itemElement = e.target.closest('.cart-item');
        if (!itemElement) return;
        
        const itemId = parseInt(itemElement.dataset.id);
        const item = state.cart.find(item => item.id === itemId);
        
        if (e.target.classList.contains('plus')) {
            item.quantity += 1;
            updateCartItem(itemId, item.quantity);
        } else if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCartItem(itemId, item.quantity);
            }
        }
    });
    
    // Применение промокода
    elements.applyPromo.addEventListener('click', applyPromoCode);
    elements.promoCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyPromoCode();
    });
    
    // Оформление заказа
    elements.checkoutBtn.addEventListener('click', checkout);
    
    // Добавление рекомендуемых товаров
    elements.recommendedGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
            e.target.textContent = '✓ Добавлено';
            setTimeout(() => {
                e.target.textContent = 'В корзину';
            }, 2000);
        }
    });
}

// Удаление товара из корзины
function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartSummary();
    loadRecommendedProducts();
}

// Обновление количества товара
function updateCartItem(productId, quantity) {
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
        updateCartSummary();
    }
}

// Применение промокода
function applyPromoCode() {
    const code = elements.promoCode.value.trim().toUpperCase();
    
    if (!code) {
        elements.promoHint.textContent = "Введите промокод";
        elements.promoHint.className = "promo-hint error";
        return;
    }
    
    if (!promoCodes[code]) {
        elements.promoHint.textContent = "Промокод не найден";
        elements.promoHint.className = "promo-hint error";
        return;
    }
    
    const promo = promoCodes[code];
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (promo.minOrder && subtotal < promo.minOrder) {
        elements.promoHint.textContent = `Минимальная сумма заказа для этого промокода ${promo.minOrder} ₽`;
        elements.promoHint.className = "promo-hint error";
        return;
    }
    
    state.appliedPromo = code;
    elements.promoHint.textContent = `Промокод применен: скидка ${promo.discount}${promo.type === "percent" ? "%" : " ₽"}`;
    elements.promoHint.className = "promo-hint success";
    updateCartSummary();
}

// Оформление заказа
function checkout() {
    if (state.cart.length === 0) return;
    
    // В реальном приложении здесь была бы отправка данных на сервер
    alert(`Заказ оформлен! Сумма: ${elements.summaryTotal.textContent}`);
    
    // Очищаем корзину после оформления
    state.cart = [];
    state.appliedPromo = null;
    saveCart();
    renderCart();
    updateCartSummary();
    loadRecommendedProducts();
    
    // Очищаем промокод
    elements.promoCode.value = "";
    elements.promoHint.textContent = "";
    elements.promoHint.className = "promo-hint";
}

// Добавление в корзину (для рекомендуемых товаров)
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.size[0] // Выбираем первый доступный размер
        });
    }
    
    saveCart();
    renderCart();
    updateCartSummary();
    loadRecommendedProducts();
}

// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    updateCartCount();
}

// Вспомогательная функция для склонения слов
function pluralize(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCart);