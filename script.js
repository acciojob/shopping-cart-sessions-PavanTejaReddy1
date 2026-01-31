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
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(product.id));

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(btn);
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const cart = getCart(); // read existing cart
  const product = products.find((p) => p.id === productId);

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
