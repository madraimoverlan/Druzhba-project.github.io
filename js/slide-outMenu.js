// Обработка меню на мобильных устройствах
function setupMobileMenu() {
    const dropdowns = document.querySelectorAll('.nav__item--dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav__link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isOpen = menu.style.display === 'block';
                
                // Закрываем все открытые меню
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.display = 'none';
                });
                
                // Открываем текущее, если было закрыто
                menu.style.display = isOpen ? 'none' : 'block';
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.nav__item--dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    
    // Ресайз окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = '';
            });
        }
    });
});