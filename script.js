const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function getCart() {
  const data = sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function rebuildCartFromDOM() {
  const cart = [];
  Array.from(cartList.children).forEach((li) => {
    const text = li.textContent;
    const product = products.find(
      (p) => `${p.name} - $${p.price}` === text
    );
    if (product) {
      cart.push(product);
    }
  });
  return cart;
}

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(product.id);
    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(btn);
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  getCart().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  let cart = getCart();

  if (cart.length === 0 && cartList.children.length > 0) {
    cart = rebuildCartFromDOM();
  }

  const product = products.find((p) => p.id === productId);
  cart.push(product);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

clearCartBtn.onclick = clearCart;

renderProducts();
renderCart();
