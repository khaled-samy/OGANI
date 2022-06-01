// Toggle navbar
const hamburgerMenu = document.querySelector(".bar");
const menu = document.querySelector("header nav ul");
const gridViewBtn = document.querySelector(".grid-view");
const listViewBtn = document.querySelector(".list-view");
const productsWrapper = document.querySelector(".products-items");
const searchForm = document.querySelector(".welcome form");
const searchField = document.querySelector(".input-wrapper input[type='text']");
const categoryFilter = document.querySelector("#category");
const priceFilter = document.querySelector("#price");


hamburgerMenu.onclick = () => menu.classList.toggle("active");

// Toggle products view (grid | list)
gridViewBtn.onclick = () => {
    productsWrapper.classList.remove("list");
    productsWrapper.classList.add("grid");
};

listViewBtn.onclick = () => {
    productsWrapper.classList.remove("grid");
    productsWrapper.classList.add("list");
};

const addProductsToLocalStorage = () => {
    localStorage.setItem("Products", JSON.stringify(availableProducts));
};
const getProductsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("Products"));
};

// Render available products
const renderProducts = (productsToRender) => {
    productsToRender.forEach((product) => {
        const item = document.createElement("div");
        item.className = "prod";
        item.setAttribute("data-id", product.id);
        item.setAttribute("data-category", product.category);
        item.setAttribute("data-price", product.price);

        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.productName;

        const productDetails = document.createElement("div");
        productDetails.className = "details";

        const info = document.createElement("div");
        info.className = "info";

        const proName = document.createElement("h5");
        proName.textContent = product.productName;
        const proPrice = document.createElement("p");
        proPrice.className = "price";
        proPrice.textContent = `$${product.price}`;

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList = "add-to-cart";
        const icon = document.createElement("i");
        icon.className = "fas fa-plus-circle";

        info.append(proName, proPrice);
        addToCartBtn.append(icon);

        productDetails.append(info, addToCartBtn);

        item.append(productImg, productDetails);

        productsWrapper.append(item);
    });
};

addProductsToLocalStorage();
renderProducts(getProductsFromLocalStorage());

// Show search results
searchForm.onsubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchField.value;
    if (searchTerm.trim() !== "") {
        const neededItems = searchProduct(
            searchTerm,
            getProductsFromLocalStorage()
        );
        productsWrapper.innerHTML = "";
        if (neededItems.length > 0) {
            renderProducts(neededItems);
        } else {
            productsWrapper.innerHTML = `<div class="not-found-message">Sorry, we don't have ${searchTerm}</div>`;
        }
    }
};

// Add to cart

const carts = document.querySelectorAll('.add-to-cart');

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(availableProducts[i]);
        totalPrice(availableProducts[i]);
	})
}

function onLoudCartNumbers() {
    
    let productNumbers = localStorage.getItem('cartNumbers'); 

    if (productNumbers) {
        document.querySelector('.cart-icon span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-icon span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-icon span').textContent = 1;
    }
    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if(cartItems[product.productName] == undefined) {
            cartItems= {
                ...cartItems,
                [product.productName]: product
            }
        }
        cartItems[product.productName].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.productName]: product
        }
    }

    product.inCart = 1;
     cartItems = {
        [product.productName]: product
    }
    
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalPrice(product) {
    console.log("this", product.productName);
    let cartPrice = localStorage.getItem('total');
    

    if(cartPrice != null) {
        cartPrice = parseInt(cartPrice);
        localStorage.setItem("total", cartPrice + product.price);
    }else {
        localStorage.setItem("total", product.price);
    }
    localStorage.setItem("total", product.price);
}


onLoudCartNumbers();




const getSelectedOption = () => { // Get Selected items from dropbox
    productsWrapper.innerHTML = "";
    renderProducts(filterProduct(categoryFilter.value, priceFilter.value, availableProducts));

}
categoryFilter.onchange = getSelectedOption;
priceFilter.onchange = getSelectedOption;
