
var products=[
{id:1,name:"Rice Pack",category:"Grocery",price:150,image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500"},
{id:2,name:"Fresh Honey",category:"Grocery",price:250,image:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500"},
{id:3,name:"Cotton T-Shirt",category:"Fashion",price:399,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"},
{id:4,name:"Casual Shoes",category:"Fashion",price:799,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"},
{id:5,name:"Flower Pot",category:"Home & Living",price:199,image:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"},
{id:6,name:"Coffee Mug",category:"Home & Living",price:249,image:"coffee mug.jpg"},
{id:7,name:"Earphones",category:"Electronics",price:499,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
{id:8,name:"Power Bank",category:"Electronics",price:899,image:"powerbank.jpg"},
{id:9,name:"Face Wash",category:"Beauty & Care",price:179,image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"},
{id:10,name:"Shampoo",category:"Beauty & Care",price:220,image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"},
{id:11,name:"Cookies",category:"Bakery & Food",price:100,image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500"},
{id:12,name:"Chocolate Cake",category:"Bakery & Food",price:350,image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"},
{id:13,name:"Notebook",category:"Books & Stationery",price:60,image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500"},
{id:14,name:"Pen Set",category:"Books & Stationery",price:90,image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"},
{id:15,name:"Football",category:"Sports",price:550,image:"football.jpg"},
{id:16,name:"Water Bottle",category:"Sports",price:180,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"}
];
function saved(key){return JSON.parse(localStorage.getItem(key)||"[]")}
function store(key,data){localStorage.setItem(key,JSON.stringify(data))}
function addToCart(id){var a=saved("kykCart");a.push(id);store("kykCart",a);alert("Added to cart");counts()}
function addToWishlist(id){var a=saved("kykWishlist");if(!a.includes(id)){a.push(id);store("kykWishlist",a);alert("Added to wishlist")}else{alert("Already in wishlist")}counts()}
function counts(){var c=document.getElementById("cart-count"),w=document.getElementById("wish-count");if(c)c.textContent=saved("kykCart").length;if(w)w.textContent=saved("kykWishlist").length}
function card(p){return '<div class="product-card"><img src="'+p.image+'" alt="'+p.name+'"><h3>'+p.name+'</h3><p class="price">₹'+p.price+'</p><div class="product-actions"><button onclick="addToCart('+p.id+')">Add to Cart</button><button class="light-btn" onclick="addToWishlist('+p.id+')">♡ Wishlist</button></div></div>'}
function showProducts(list){var box=document.getElementById("product-list");if(box)box.innerHTML=list.length?list.map(card).join(""):"<p>No products found.</p>"}
function removeCart(i){var a=saved("kykCart");a.splice(i,1);store("kykCart",a);showCart();counts()}
function showCart(){var box=document.getElementById("cart-items");if(!box)return;var a=saved("kykCart"),total=0;if(!a.length){box.innerHTML="<p>Your cart is empty.</p>";document.getElementById("cart-total").textContent=0;return}box.innerHTML=a.map(function(id,i){var p=products.find(x=>x.id===id);if(!p)return"";total+=p.price;return '<div class="list-row"><div class="list-left"><img src="'+p.image+'"><div>'+p.name+'<br>₹'+p.price+'</div></div><button onclick="removeCart('+i+')">Remove</button></div>'}).join("");document.getElementById("cart-total").textContent=total}
function removeWish(id){store("kykWishlist",saved("kykWishlist").filter(x=>x!==id));showWishlist();counts()}
function showWishlist(){var box=document.getElementById("wishlist-items");if(!box)return;var a=saved("kykWishlist");box.innerHTML=a.length?a.map(function(id){var p=products.find(x=>x.id===id);return p?'<div class="list-row"><div class="list-left"><img src="'+p.image+'"><div>'+p.name+'<br>₹'+p.price+'</div></div><div><button onclick="addToCart('+id+')">Add to Cart</button> <button onclick="removeWish('+id+')">Remove</button></div></div>':""}).join(""):"<p>Your wishlist is empty.</p>"}
document.addEventListener("DOMContentLoaded",function(){
  counts();
  var params = new URLSearchParams(location.search);
  var cat = params.get("category");
  var initialSearch = params.get("search") || "";
  var list = products;
  if(cat) list = products.filter(function(p){ return p.category === cat; });
  if(initialSearch) {
    var term = initialSearch.toLowerCase();
    list = list.filter(function(p){ return p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term); });
  }
  showProducts(list);
  var s = document.getElementById("product-search");
  if(s) {
    s.value = initialSearch;
    s.addEventListener("input",function(){
      var term = s.value.toLowerCase();
      var base = cat ? products.filter(function(p){return p.category === cat;}) : products;
      showProducts(base.filter(function(p){return p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);}));
    });
  }
  showCart();
  showWishlist();
});

function openProfile() {
  var modal = document.getElementById("profile-modal");
  if (!modal) return;
  var profile = JSON.parse(localStorage.getItem("kykProfile") || "{}");
  document.getElementById("profile-name").value = profile.name || "";
  document.getElementById("profile-phone").value = profile.phone || "";
  document.getElementById("profile-email").value = profile.email || "";
  document.getElementById("profile-address").value = profile.address || "";
  document.getElementById("profile-pincode").value = profile.pincode || "";
  document.getElementById("profile-district").value = profile.district || "";
  modal.classList.add("show");
}
function closeProfile() {
  var modal = document.getElementById("profile-modal");
  if (modal) modal.classList.remove("show");
}
function closeProfileOutside(event) {
  if (event.target.id === "profile-modal") closeProfile();
}
function saveProfile(event) {
  event.preventDefault();
  var profile = {
    name: document.getElementById("profile-name").value,
    phone: document.getElementById("profile-phone").value,
    email: document.getElementById("profile-email").value,
    address: document.getElementById("profile-address").value,
    pincode: document.getElementById("profile-pincode").value,
    district: document.getElementById("profile-district").value
  };
  localStorage.setItem("kykProfile", JSON.stringify(profile));
  alert("Your profile has been saved on this browser.");
  closeProfile();
}
function searchFromHome() {
  var input = document.getElementById("home-search");
  var value = input ? input.value.trim() : "";
  window.location.href = "products.html" + (value ? "?search=" + encodeURIComponent(value) : "");
}


// Highlight the current navigation page and keep links easy to use.
document.addEventListener("DOMContentLoaded", function () {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var navLinks = document.querySelectorAll("header nav a");
    navLinks.forEach(function (link) {
        var linkPage = link.getAttribute("href").split("?")[0];
        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});
