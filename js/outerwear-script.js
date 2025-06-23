// Данные товаров верхней одежды
const outerwearData = [
    { 
        id: 1, 
        name: "Шерстяное пальто с поясом", 
        category: "coats", 
        material: "wool",
        season: ["winter", "autumn"],
        size: ["S", "M", "L"], 
        price: 12500, 
        oldPrice: 15000, 
        isNew: true, 
        image: "img/wool-coat.webp",
        colors: ["beige", "black"]
    },
    { 
        id: 2, 
        name: "Кожаная куртка байкерская", 
        category: "jackets", 
        material: "leather",
        season: ["spring", "autumn"],
        size: ["XS", "S", "M"], 
        price: 18900, 
        oldPrice: 22000, 
        isNew: false, 
        image: "img/leather-jacket.webp",
        colors: ["black", "brown"]
    },
    { 
        id: 3, 
        name: "Пуховик утепленный", 
        category: "down-jackets", 
        material: "down",
        season: ["winter"],
        size: ["M", "L", "XL"], 
        price: 14500, 
        oldPrice: 0, 
        isNew: true, 
        image: "img/пуховик.jpg",
        colors: ["black", "navy"]
    },
    { 
        id: 4, 
        name: "Тренч в стиле милитари", 
        category: "trench", 
        material: "cotton",
        season: ["spring", "autumn"],
        size: ["S", "M", "L"], 
        price: 9800, 
        oldPrice: 12000, 
        isNew: false, 
        image: "img/тренч.jpg",
        colors: ["khaki", "beige"]
    },
    { 
        id: 5, 
        name: "Парка с меховым капюшоном", 
        category: "parkas", 
        material: "polyester",
        season: ["winter"],
        size: ["S", "M"], 
        price: 16700, 
        oldPrice: 19500, 
        isNew: false, 
        image: "img/парка.webp",
        colors: ["green", "gray"]
    },
    { 
        id: 6, 
        name: "Дубленка овчинная", 
        category: "coats", 
        material: "sheepskin",
        season: ["winter"],
        size: ["M", "L"], 
        price: 24500, 
        oldPrice: 28900, 
        isNew: true, 
        image: "img/дубленка.jpg",
        colors: ["brown", "black"]
    },
    { 
        id: 7, 
        name: "Джинсовая куртка", 
        category: "jackets", 
        material: "denim",
        season: ["spring", "summer", "autumn"],
        size: ["XS", "S", "M", "L"], 
        price: 6500, 
        oldPrice: 8500, 
        isNew: false, 
        image: "img/jeans.png",
        colors: ["blue", "black"]
    },
    { 
        id: 8, 
        name: "Пальто демисезонное", 
        category: "coats", 
        material: "wool",
        season: ["spring", "autumn"],
        size: ["S", "M", "L"], 
        price: 11200, 
        oldPrice: 13500, 
        isNew: true, 
        image: "img/пальтодем.jpg",
        colors: ["gray", "camel"]
    },
    { 
        id: 9, 
        name: "Ветровка с капюшоном", 
        category: "jackets", 
        material: "nylon",
        season: ["spring", "summer"],
        size: ["XS", "S", "M"], 
        price: 4200, 
        oldPrice: 5900, 
        isNew: false, 
        image: "img/ветровка.webp",
        colors: ["red", "blue", "black"]
    },
    { 
        id: 10, 
        name: "Пуховик легкий", 
        category: "down-jackets", 
        material: "down",
        season: ["autumn", "winter"],
        size: ["M", "L", "XL"], 
        price: 8700, 
        oldPrice: 11000, 
        isNew: false, 
        image: "img/downjacket2.webp",
        colors: ["pink", "white"]
    },
    { 
        id: 11, 
        name: "Пальто шерстяное oversize", 
        category: "coats", 
        material: "wool",
        season: ["winter", "autumn"],
        size: ["L", "XL"], 
        price: 14300, 
        oldPrice: 0, 
        isNew: true, 
        image: "img/coat3.webp",
        colors: ["black", "gray"]
    },
    { 
        id: 12, 
        name: "Куртка стеганая", 
        category: "jackets", 
        material: "polyester",
        season: ["spring", "autumn"],
        size: ["S", "M", "L"], 
        price: 7600, 
        oldPrice: 9500, 
        isNew: false, 
        image: "img/quilted1.webp",
        colors: ["beige", "green"]
    }
];

// Состояние каталога
const state = {
    products: [...outerwearData],
    filteredProducts: [...outerwearData],
    filters: {
        categories: ["coats", "jackets", "down-jackets", "trench", "parkas"],
        sizes: [],
        materials: [],
        seasons: [],
        priceRange: [2000, 30000]
    },
    sortBy: 'popular',
    currentPage: 1,
    productsPerPage: 8
};

// DOM элементы
const elements = {
    catalogGrid: document.getElementById('catalogGrid'),
    filterBtn: document.getElementById('filterBtn'),
    filterPanel: document.getElementById('filterPanel'),
    categoryFilters: document.querySelectorAll('.filter-group:nth-child(1) input[type="checkbox"]'),
    sizeButtons: document.querySelectorAll('.size-btn'),
    materialFilters: document.querySelectorAll('.filter-group:nth-child(3) input[type="checkbox"]'),
    seasonFilters: document.querySelectorAll('.filter-group:nth-child(4) input[type="checkbox"]'),
    priceSlider: document.querySelector('.price-slider'),
    priceValues: document.querySelector('.price-values'),
    sortSelect: document.getElementById('sortSelect'),
    pagination: document.getElementById('pagination'),
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
                <div class="product-card__meta">
                    <span class="product-card__material">${getMaterialName(product.material)}</span>
                    <span class="product-card__season">${getSeasonNames(product.season)}</span>
                </div>
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

function getMaterialName(material) {
    const materials = {
        'wool': 'Шерсть',
        'cotton': 'Хлопок',
        'leather': 'Кожа',
        'down': 'Пух',
        'polyester': 'Полиэстер',
        'sheepskin': 'Овчина',
        'denim': 'Деним',
        'nylon': 'Нейлон'
    };
    return materials[material] || material;
}

function getSeasonNames(seasons) {
    const seasonNames = {
        'winter': 'Зима',
        'spring': 'Весна',
        'summer': 'Лето',
        'autumn': 'Осень'
    };
    return seasons.map(s => seasonNames[s]).join(', ');
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
    
    elements.materialFilters.forEach(filter => {
        filter.addEventListener('change', handleMaterialFilter);
    });
    
    elements.seasonFilters.forEach(filter => {
        filter.addEventListener('change', handleSeasonFilter);
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
    let filtered = [...outerwearData];
    
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
    
    // Фильтр по материалам
    if (state.filters.materials.length > 0) {
        filtered = filtered.filter(product => 
            state.filters.materials.includes(product.material)
        );
    }
    
    // Фильтр по сезонам
    if (state.filters.seasons.length > 0) {
        filtered = filtered.filter(product => 
            product.season.some(s => state.filters.seasons.includes(s))
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
            state.filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.id - b.id);
            break;
        default: // popular
            state.filteredProducts.sort((a, b) => b.id - a.id);
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

function handleMaterialFilter(e) {
    const material = e.target.nextSibling.textContent.trim().toLowerCase();
    
    if (e.target.checked) {
        state.filters.materials.push(material);
    } else {
        state.filters.materials = state.filters.materials.filter(m => m !== material);
    }
    
    filterProducts();
}

function handleSeasonFilter(e) {
    const season = e.target.nextSibling.textContent.trim().toLowerCase();
    
    if (e.target.checked) {
        state.filters.seasons.push(season);
    } else {
        state.filters.seasons = state.filters.seasons.filter(s => s !== season);
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
    const product = outerwearData.find(p => p.id === productId);
    
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

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCatalog);