// Product class
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  addItem(product) {
    let item = this.items.find((item) => item.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.items.push(new ShoppingCartItem(product));
    }
    this.displayCart();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }

  displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    this.items.forEach((item) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.product.image;
      img.alt = item.product.name;
      li.appendChild(img);

      const info = document.createElement('div');
      info.classList.add('item-info');
      info.innerHTML = `
        <p>${item.product.name}</p>
        <p>Price: $${item.product.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total Price: $${item.getTotalPrice().toFixed(2)}</p>
      `;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.setAttribute('data-product-id', item.product.id);
      removeButton.addEventListener('click', (event) => {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        this.removeItem(productId);
      });

      info.appendChild(removeButton);
      li.appendChild(info);
      cartItemsElement.appendChild(li);
    });

    const totalItemsElement = document.getElementById('total-items');
    totalItemsElement.textContent = this.getTotalItems();
  }
}

// Create some products
const product1 = new Product(1, 'Runner', 19.99, 'Fox-Union-BOA.webp');
const product2 = new Product(2, 'Maxi foot', 29.99, 'hoka-zinal.jpg');

// Create shopping cart
const cart = new ShoppingCart();

// Function to add product to cart
function addToCart(productId) {
  if (productId === 1) {
    cart.addItem(product1);
  } else if (productId === 2) {
    cart.addItem(product2);
  }
}

// Initial display of cart items
cart.displayCart();
