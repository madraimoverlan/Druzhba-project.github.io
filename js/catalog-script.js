// Данные товаров
const productsData = JSON.parse(localStorage.getItem('storeProducts')) || [
  // дефолтные товары, если в localStorage ничего нет
  { id: 1, name: "Шерстяное пальто", category: "coats", size: ["S", "M", "L"], price: 10000, oldPrice: 12500, isNew: true, image: "img/Fashion wool coat -8.png" },
  { id: 2, name: "Джинсы с высокой талией", category: "pants", size: ["XS", "S", "M"], price: 4500, oldPrice: 6000, isNew: false, image: "img/highjeans.webp" },
  { id: 3, name: "Платье миди", category: "dresses", size: ["S", "M"], price: 7000, oldPrice: 8500, isNew: true, image: "img/dress-midi.jpg" },
    { id: 4, name: "Футболка oversize", category: "tshirts", size: ["M", "L", "XL"], price: 2000, oldPrice: 3000, isNew: false, image: "img/t-shirt1.jpg" },
    { id: 5, name: "Кожаная куртка", category: "coats", size: ["M", "L"], price: 12000, oldPrice: 15000, isNew: false, image: "img/leather-jacket.webp" },
    { id: 6, name: "Свитшот с капюшоном", category: "sweatshirts", size: ["S", "M", "L"], price: 3500, oldPrice: 0, isNew: true, image: "img/switshot.webp" },
    { id: 7, name: "Юбка-карандаш", category: "skirts", size: ["XS", "S", "M"], price: 3800, oldPrice: 5000, isNew: false, image: "img/Fashion wool coat -8.png" },
    { id: 8, name: "Блузка с рюшами", category: "blouses", size: ["S", "M"], price: 2800, oldPrice: 0, isNew: true, image: "img/Fashion wool coat -8.png" },
    { id: 9, name: "Шорты джинсовые", category: "shorts", size: ["S", "M", "L"], price: 3200, oldPrice: 4000, isNew: false, image: "img/Fashion wool coat -8.png" },
    { id: 10, name: "Кардиган", category: "cardigans", size: ["M", "L", "XL"], price: 4200, oldPrice: 5500, isNew: false, image: "img/Fashion wool coat -8.png" },
    { id: 11, name: "Топ с открытыми плечами", category: "tops", size: ["XS", "S", "M"], price: 1800, oldPrice: 0, isNew: true, image: "img/Fashion wool coat -8.png" },
    { id: 12, name: "Брюки-клеш", category: "pants", size: ["S", "M", "L"], price: 3900, oldPrice: 5200, isNew: false, image: "img/Fashion wool coat -8.png" }
];

// Обновленная функция инициализации каталога
function initCatalog() {
  // Проверяем, есть ли обновленные товары в localStorage
  const savedProducts = JSON.parse(localStorage.getItem('storeProducts'));
  if (savedProducts) {
    state.products = [...savedProducts];
    state.filteredProducts = [...savedProducts];
  }
  
  renderProducts();
  updateCartSummary();
  loadRecommendedProducts();
  setupEventListeners();
}

// Состояние каталога
const state = {
    products: [...productsData],
    filteredProducts: [...productsData],
    filters: {
        categories: [],
        sizes: [],
        priceRange: [0, 50000]
    },
    sortBy: 'default',
    currentPage: 1,
    productsPerPage: 6
};

// DOM элементы
const elements = {
    catalogGrid: document.getElementById('catalogGrid'),
    filterBtn: document.getElementById('filterBtn'),
    filterPanel: document.getElementById('filterPanel'),
    categoryFilters: document.querySelectorAll('.filter-list input[type="checkbox"]'),
    sizeButtons: document.querySelectorAll('.size-btn'),
    priceSlider: document.querySelector('.price-slider'),
    priceValues: document.querySelector('.price-values'),
    sortSelect: document.getElementById('sortSelect'),
    pagination: document.querySelector('.catalog-pagination'),
    cartCount: document.getElementById('cart-count')
};

// Инициализация каталога
function initCatalog() {
    renderProducts();
    setupEventListeners();
    updateCartCount();
}

// Рендер товаров
function renderProducts() {
    const start = (state.currentPage - 1) * state.productsPerPage;
    const end = start + state.productsPerPage;
    const productsToShow = state.filteredProducts.slice(start, end);

    elements.catalogGrid.innerHTML = productsToShow.map(product => `
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

    renderPagination();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтры
    elements.filterBtn.addEventListener('click', toggleFilterPanel);
    
    elements.categoryFilters.forEach(filter => {
        filter.addEventListener('change', handleCategoryFilter);
    });
    
    elements.sizeButtons.forEach(button => {
        button.addEventListener('click', handleSizeFilter);
    });
    
    elements.priceSlider.addEventListener('input', handlePriceFilter);
    
    // Сортировка
    elements.sortSelect.addEventListener('change', handleSort);
    
    // Пагинация
    document.addEventListener('click', handlePaginationClick);
    
    // Корзина
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(e);
        }
    });
}

// Фильтрация товаров
function filterProducts() {
    let filtered = [...productsData];
    
    // Фильтр по категориям
    if (state.filters.categories.length > 0) {
        filtered = filtered.filter(product => 
            state.filters.categories.includes(product.category)
        );
    }
    
    // Фильтр по размерам
    if (state.filters.sizes.length > 0) {
        filtered = filtered.filter(product => 
            state.filters.sizes.some(size => product.size.includes(size))
        );
    }
    
    // Фильтр по цене
    filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
    );
    
    state.filteredProducts = filtered;
    state.currentPage = 1;
    renderProducts();
}

// Сортировка товаров
function sortProducts() {
    switch(state.sortBy) {
        case 'price-asc':
            state.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            state.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            state.filteredProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        default:
            state.filteredProducts = [...productsData];
    }
    
    renderProducts();
}

// Пагинация
function renderPagination() {
    const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
    
    if (totalPages <= 1) {
        elements.pagination.style.display = 'none';
        return;
    }
    
    elements.pagination.style.display = 'flex';
    
    const pagesHTML = Array.from({length: totalPages}, (_, i) => {
        const page = i + 1;
        return `<button class="page-btn ${page === state.currentPage ? 'page-btn--active' : ''}">${page}</button>`;
    }).join('');
    
    elements.pagination.innerHTML = `
        <button class="pagination-btn ${state.currentPage === 1 ? 'pagination-btn--disabled' : ''}" data-action="prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Назад
        </button>
        
        <div class="pagination-pages">
            ${pagesHTML}
        </div>
        
        <button class="pagination-btn ${state.currentPage === totalPages ? 'pagination-btn--disabled' : ''}" data-action="next">
            Вперед
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;
}

// Обработчики событий
function toggleFilterPanel() {
    elements.filterPanel.classList.toggle('active');
    elements.filterBtn.classList.toggle('active');
}

function handleCategoryFilter(e) {
    const category = e.target.value;
    
    if (e.target.checked) {
        state.filters.categories.push(category);
    } else {
        state.filters.categories = state.filters.categories.filter(c => c !== category);
    }
    
    filterProducts();
}

function handleSizeFilter(e) {
    const size = e.target.textContent;
    
    if (e.target.classList.contains('size-btn--active')) {
        e.target.classList.remove('size-btn--active');
        state.filters.sizes = state.filters.sizes.filter(s => s !== size);
    } else {
        e.target.classList.add('size-btn--active');
        state.filters.sizes.push(size);
    }
    
    filterProducts();
}

function handlePriceFilter(e) {
    const value = parseInt(e.target.value);
    state.filters.priceRange[1] = value;
    elements.priceValues.children[1].textContent = value.toLocaleString();
    filterProducts();
}

function handleSort(e) {
    state.sortBy = e.target.value;
    sortProducts();
}

function handlePaginationClick(e) {
    if (e.target.closest('[data-action="prev"]')) {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderProducts();
        }
    } else if (e.target.closest('[data-action="next"]')) {
        const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderProducts();
        }
    } else if (e.target.classList.contains('page-btn')) {
        state.currentPage = parseInt(e.target.textContent);
        renderProducts();
    }
}

// Работа с корзиной
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = productsData.find(p => p.id === productId);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    animateAddToCart(e.target);
}

function animateAddToCart(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Добавлено';
    button.classList.add('added');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
}


// Функция для обновления данных товаров из localStorage
function updateProductsFromStorage() {
  const savedProducts = JSON.parse(localStorage.getItem('storeProducts'));
  if (savedProducts) {
    state.products = [...savedProducts];
    state.filteredProducts = [...savedProducts];
    renderProducts();
  }
}

// Вызывайте эту функцию при загрузке страницы и после изменений в корзине
document.addEventListener('DOMContentLoaded', function() {
  initCatalog();
  
  // Слушаем изменения в localStorage (если админ изменил товары в другой вкладке)
  window.addEventListener('storage', function(e) {
    if (e.key === 'storeProducts') {
      updateProductsFromStorage();
    }
  });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCatalog);