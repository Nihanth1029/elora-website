const products = [
  {id:1,name:"Oversized Shirt",price:1499,img:"/prod-tee.jpg",sizes:["S","M","L","XL"]},
  {id:2,name:"Classic Tee",price:799,img:"/prod-tee.jpg",sizes:["S","M","L","XL"]},
  {id:3,name:"Linen Pants",price:1999,img:"/new.jpg",sizes:["S","M","L","XL"]},
  {id:4,name:"Hoodie",price:1799,img:"./prod-hoodie.jpg",sizes:["S","M","L","XL"]},
  {id:5,name:"ELORA Cap",price:499,img:"/cap.jpg",sizes:["One Size"]},
  {id:6,name:"Shoulder Bag",price:1299,img:"/prod-bag.jpg",sizes:["One Size"]}
];

let cart = JSON.parse(localStorage.getItem("eloraCart") || "[]");

function money(n){ return "₹" + n.toLocaleString("en-IN"); }

function renderProducts(){
  const el=document.getElementById("products");
  el.innerHTML=products.map((p,i)=>`
    <article class="product-card">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-info">
        <div>
          <div class="product-name">${p.name}</div>
          <div class="price">${money(p.price)}</div>
        </div>
        <button class="add" onclick="addToCart(${p.id})">Add to bag</button>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const p=products.find(x=>x.id===id);
  cart.push(p);
  saveCart();
  openCart();
}
function removeFromCart(index){ cart.splice(index,1); saveCart(); renderCart(); }
function saveCart(){ localStorage.setItem("eloraCart",JSON.stringify(cart)); renderCart(); }

function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const items=document.getElementById("cartItems");
  items.innerHTML=cart.length ? cart.map((p,i)=>`
    <div class="cart-item">
      <img src="${p.img}" alt="${p.name}">
      <div><h4>${p.name}</h4><p>${money(p.price)}</p></div>
      <button class="remove" onclick="removeFromCart(${i})">Remove</button>
    </div>`).join("") : `<p class="small" style="padding:30px 0">Your bag is empty.</p>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}

function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>alert("Demo checkout. Connect Razorpay/Stripe or another payment provider before launch.");

document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("newsletterMsg").textContent="You're on the ELORA list.";
  e.target.reset();
});

renderProducts();
renderCart();
