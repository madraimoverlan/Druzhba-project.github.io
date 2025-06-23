// Функция для сохранения товаров в localStorage
function saveProductsToLocalStorage() {
  localStorage.setItem('storeProducts', JSON.stringify(productsData));
}

// Функция для загрузки товаров из localStorage
function loadProductsFromLocalStorage() {
  const savedProducts = localStorage.getItem('storeProducts');
  if (savedProducts) {
    productsData = JSON.parse(savedProducts);
  }
  renderProductsTable();
}

// Обновленная функция инициализации
function initAdminProducts() {
  loadProductsFromLocalStorage();
  setupEventListeners();
}

// Обновленная функция для обработки формы товара
function handleProductFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    id: currentProductId || generateNextId(),
    name: document.getElementById('product-name').value,
    category: document.getElementById('product-category').value,
    price: parseInt(document.getElementById('product-price').value),
    oldPrice: document.getElementById('product-old-price').value ? 
      parseInt(document.getElementById('product-old-price').value) : null,
    description: document.getElementById('product-description').value,
    isNew: document.getElementById('product-is-new').checked,
    size: Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value),
    image: document.getElementById('image-preview').querySelector('img')?.src || 
      (currentProductId ? productsData.find(p => p.id === currentProductId)?.image : 'img/default-product.jpg')
  };
  
  if (currentProductId) {
    const index = productsData.findIndex(p => p.id === currentProductId);
    if (index !== -1) {
      productsData[index] = formData;
    }
  } else {
    productsData.push(formData);
  }
  
  saveProductsToLocalStorage(); // Сохраняем изменения
  renderProductsTable();
  closeProductModal();
  alert(`Товар "${formData.name}" успешно ${currentProductId ? 'обновлен' : 'добавлен'}!`);
}

// Обновленная функция удаления товара
function deleteProduct() {
  if (!productToDelete) return;
  
  productsData = productsData.filter(p => p.id !== productToDelete);
  saveProductsToLocalStorage(); // Сохраняем изменения
  renderProductsTable();
  closeConfirmModal();
  alert('Товар успешно удален!');
}