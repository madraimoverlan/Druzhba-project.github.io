        // Данные платьев
        const dressesData = [
            { 
                id: 1, 
                name: "Вечернее платье с кружевом", 
                type: "evening", 
                material: "lace",
                color: ["black", "red"],
                size: ["S", "M", "L"], 
                price: 12500, 
                oldPrice: 15000, 
                isNew: true, 
                image: "img/dress1.jpg",
                description: "Элегантное вечернее платье из кружева с открытой спиной. Идеально подходит для торжественных мероприятий и особых случаев."
            },
            { 
                id: 2, 
                name: "Летнее платье с цветочным принтом", 
                type: "summer", 
                material: "cotton",
                color: ["white", "blue"],
                size: ["XS", "S", "M"], 
                price: 4500, 
                oldPrice: 6000, 
                isNew: false, 
                image: "img/dress2.jpg",
                description: "Легкое летнее платье из натурального хлопка с цветочным принтом. Комфортно в жаркую погоду."
            },
            { 
                id: 3, 
                name: "Офисное платье-футляр", 
                type: "office", 
                material: "viscose",
                color: ["black", "blue"],
                size: ["S", "M"], 
                price: 7800, 
                oldPrice: 9500, 
                isNew: true, 
                image: "img/dress3.jpg",
                description: "Строгое офисное платье-футляр из вискозы. Подчеркивает фигуру и сохраняет комфорт в течение всего дня."
            },
            { 
                id: 4, 
                name: "Коктейльное платье с рюшами", 
                type: "cocktail", 
                material: "silk",
                color: ["red", "pink"],
                size: ["M", "L", "XL"], 
                price: 8900, 
                oldPrice: 11000, 
                isNew: false, 
                image: "img/dress4.jpg",
                description: "Стильное коктейльное платье из шелка с рюшами. Отлично подходит для вечеринок и праздничных мероприятий."
            },
            { 
                id: 5, 
                name: "Повседневное платье-рубашка", 
                type: "casual", 
                material: "cotton",
                color: ["white", "blue"],
                size: ["S", "M", "L"], 
                price: 3500, 
                oldPrice: 4500, 
                isNew: false, 
                image: "img/dress5.jpg",
                description: "Удобное повседневное платье-рубашка из хлопка. Универсальный вариант для прогулок и встреч с друзьями."
            },
            { 
                id: 6, 
                name: "Шифоновое платье миди", 
                type: "evening", 
                material: "chiffon",
                color: ["black", "pink"],
                size: ["XS", "S", "M"], 
                price: 10200, 
                oldPrice: 12500, 
                isNew: true, 
                image: "img/dress6.jpg",
                description: "Романтичное шифоновое платье миди длины. Легкие струящиеся ткани создают женственный образ."
            },
            { 
                id: 7, 
                name: "Платье с открытыми плечами", 
                type: "summer", 
                material: "cotton",
                color: ["white", "red"],
                size: ["S", "M", "L"], 
                price: 5600, 
                oldPrice: 7000, 
                isNew: false, 
                image: "img/dress7.jpg",
                description: "Летнее платье с открытыми плечами из дышащего хлопка. Подчеркивает женственность и сохраняет прохладу."
            },
            { 
                id: 8, 
                name: "Платье-макси с поясом", 
                type: "evening", 
                material: "silk",
                color: ["black", "blue"],
                size: ["M", "L"], 
                price: 14500, 
                oldPrice: 0, 
                isNew: true, 
                image: "img/dress8.jpg",
                description: "Роскошное платье-макси из шелка с декоративным поясом. Создает элегантный образ для особых случаев."
            },
            { 
                id: 9, 
                name: "Платье в горошек", 
                type: "casual", 
                material: "cotton",
                color: ["black", "white"],
                size: ["XS", "S", "M"], 
                price: 4200, 
                oldPrice: 5500, 
                isNew: false, 
                image: "img/dress9.jpg",
                description: "Милый повседневное платье в горошек из хлопка. Идеально сочетается с джинсовой курткой или кардиганом."
            },
            { 
                id: 10, 
                name: "Кружевное платье-футляр", 
                type: "office", 
                material: "lace",
                color: ["black"],
                size: ["S", "M", "L"], 
                price: 9500, 
                oldPrice: 11500, 
                isNew: false, 
                image: "img/dress10.jpg",
                description: "Деловое кружевное платье-футляр. Сочетает строгость офисного стиля с женственностью кружевных деталей."
            },
            { 
                id: 11, 
                name: "Платье с воланами", 
                type: "cocktail", 
                material: "silk",
                color: ["red", "pink"],
                size: ["S", "M"], 
                price: 8700, 
                oldPrice: 0, 
                isNew: true, 
                image: "img/dress11.jpg",
                description: "Игривое коктейльное платье с воланами из шелка. Добавляет образу динамики и женственности."
            },
            { 
                id: 12, 
                name: "Платье-сафари", 
                type: "casual", 
                material: "cotton",
                color: ["blue"],
                size: ["M", "L", "XL"], 
                price: 6500, 
                oldPrice: 8000, 
                isNew: false, 
                image: "img/dress12.jpg",
                description: "Стильное платье-сафари из плотного хлопка. Удобный крой и практичные детали делают его идеальным для путешествий."
            }
        ];

        // Состояние каталога
        const state = {
            products: [...dressesData],
            filteredProducts: [...dressesData],
            filters: {
                types: ["evening", "casual", "office", "summer", "cocktail"],
                sizes: [],
                materials: [],
                colors: [],
                priceRange: [1500, 25000]
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
            typeFilters: document.querySelectorAll('.filter-group:nth-child(1) input[type="checkbox"]'),
            sizeButtons: document.querySelectorAll('.size-btn'),
            materialFilters: document.querySelectorAll('.filter-group:nth-child(3) input[type="checkbox"]'),
            colorButtons: document.querySelectorAll('.color-btn'),
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
            updatePriceSlider();
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
                            <span class="product-card__type">${getTypeName(product.type)}</span>
                        </div>
                        <div class="product-card__color">
                            ${product.color.map(c => `
                                <span class="product-card__color-item" style="background-color: ${getColorCode(c)}"></span>
                            `).join('')}
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

        // Вспомогательные функции для отображения
        function getMaterialName(material) {
            const materials = {
                'lace': 'Кружево',
                'cotton': 'Хлопок',
                'silk': 'Шелк',
                'viscose': 'Вискоза',
                'chiffon': 'Шифон'
            };
            return materials[material] || material;
        }

        function getTypeName(type) {
            const types = {
                'evening': 'Вечернее',
                'casual': 'Повседневное',
                'office': 'Офисное',
                'summer': 'Летнее',
                'cocktail': 'Коктейльное'
            };
            return types[type] || type;
        }

        function getColorCode(color) {
            const colors = {
                'black': '#000000',
                'white': '#ffffff',
                'red': '#ff0000',
                'blue': '#0000ff',
                'pink': '#ffc0cb'
            };
            return colors[color] || color;
        }

        // Настройка обработчиков событий
        function setupEventListeners() {
            // Фильтры
            elements.filterBtn.addEventListener('click', toggleFilterPanel);
            
            elements.typeFilters.forEach(filter => {
                filter.addEventListener('change', handleTypeFilter);
            });
            
            elements.sizeButtons.forEach(button => {
                button.addEventListener('click', handleSizeFilter);
            });
            
            elements.materialFilters.forEach(filter => {
                filter.addEventListener('change', handleMaterialFilter);
            });
            
            elements.colorButtons.forEach(button => {
                button.addEventListener('click', handleColorFilter);
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
                if (e.target.classList.contains('quick-view')) {
                    const productId = e.target.dataset.id;
                    window.location.href = `product-dress.html?id=${productId}`;
                }
            });
            
            // Мобильное меню
            setupMobileMenu();
        }

        // Фильтрация товаров
        function filterProducts() {
            let filtered = [...dressesData];
            
            // Фильтр по типам
            if (state.filters.types.length > 0) {
                filtered = filtered.filter(product => 
                    state.filters.types.includes(product.type)
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
            
            // Фильтр по цветам
            if (state.filters.colors.length > 0) {
                filtered = filtered.filter(product => 
                    product.color.some(c => state.filters.colors.includes(c))
                );
            }
            
            // Фильтр по цене
            filtered = filtered.filter(product => 
                product.price >= state.filters.priceRange[0] && 
                product.price <= state.filters.priceRange[1]
            );
            
            state.filteredProducts = filtered;
            state.currentPage = 1;
            sortProducts();
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
                    state.filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
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

        function handleTypeFilter(e) {
            const type = e.target.value;
            
            if (e.target.checked) {
                state.filters.types.push(type);
            } else {
                state.filters.types = state.filters.types.filter(t => t !== type);
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

        function handleColorFilter(e) {
            const color = e.target.dataset.color;
            
            if (e.target.classList.contains('color-btn--active')) {
                e.target.classList.remove('color-btn--active');
                state.filters.colors = state.filters.colors.filter(c => c !== color);
            } else {
                e.target.classList.add('color-btn--active');
                state.filters.colors.push(color);
            }
            
            filterProducts();
        }

        function handlePriceFilter(e) {
            const value = parseInt(e.target.value);
            state.filters.priceRange[1] = value;
            updatePriceSlider();
            filterProducts();
        }

        function updatePriceSlider() {
            elements.priceValues.children[1].textContent = state.filters.priceRange[1].toLocaleString();
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
            const product = dressesData.find(p => p.id === productId);
            
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

        // Мобильное меню
        function setupMobileMenu() {
            const dropdowns = document.querySelectorAll('.nav__item--dropdown');
            
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav__link');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const isOpen = menu.style.display === 'block';
                        
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            m.style.display = 'none';
                        });
                        
                        menu.style.display = isOpen ? 'none' : 'block';
                    }
                });
            });
            
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && !e.target.closest('.nav__item--dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.style.display = 'none';
                    });
                }
            });
            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.style.display = '';
                    });
                }
            });
        }

        // Инициализация при загрузке
        document.addEventListener('DOMContentLoaded', initCatalog);