var carts = document.querySelectorAll('.add-cart');

var products = [ 
    {
        name: "JoyJolt HUE Stemless Wine Glass Set - Large 15 oz Stemless Wine Glasses Set of 6",
        tag: "product",
        price: 28.90,
        inCart: 0
    },
    {
        name: "Portmeirion Botanic Garden 19 oz Stemless Wine Glasses, Set of 4",
        tag: "product2",
        price: 22.99,
        inCart: 0
    },
    {
        name: "Portmeirion Botanic Garden Highball Drinking Glasses, Set of 4 - Assorted",
        tag: "product3(1)",
        price: 26.99,
        inCart: 0
    },
    {
        name: "Set of 6 Tall Drinking Glasses Christmas Bullfinch Birds Highball Tumbler,Russia",
        tag: "product4(3)",
        price: 27.99,
        inCart: 0
    },
    {
        name: "Aerating Wine Glasses - Set of 4 Stemless Blown Glass Curved Cups",
        tag: "Latest1(3)",
        price: 31.99,
        inCart: 0
    },
    {
        name: "Crafted Liquor Decanter Set w/ 4pcs Whiskey Bourbon Glasses - Lead Free Crystal",
        tag: "Latest2",
        price: 47.99,
        inCart: 0
    },
    {
        name: "Marquis by Waterford Markham 4-Piece Traditional Crystal Wine Glass Set",
        tag: "Latest3",
        price: 25.99,
        inCart: 0
    },
    {
        name: "Goblet, White Wine Crystal Glass, Water Glass, Stemmed Glasses, Set of 6 Goblets, 8 oz, Beautifully Designed, by Barski, Made in Europe ",
        tag: "Latest4",
        price: 31.99,
        inCart: 0
    },
    {
        name: "Wine Glass, Colored Glass Goblet, Set of 2, 10oz Vintage Pattern Embossed High Clear Glass Goblets for Party",
        tag: "Latest5",
        price: 32.99,
        inCart: 0
    },
    {
        name: "Transparent Refined Goblet, Stem For Cabernet, Gifts (Double pink gift box,2 Gift Box) ",
        tag: "Latest6",
        price: 18.99,
        inCart: 0
    },
    {
        name: "BTaT - Fancy Wine Glasses, Floral Wine Glass, Set of 2, Flower Wine Glass, Decorative Wine Glasses, Wine Glass Floral, Decorated Wine Glasses, Wine Glasses Design, Decorative Wine Glasses for Women ",
        tag: "Latest7",
        price: 20.99,
        inCart: 0
    },
    {
        name: "Luka Tech Enamels Butterfly flower Lead-free Glass Coffee Mugs Tea Cup with Steel Spoon, Best Birthday Gifts For Women Wife Mom Friends Mothers Valentines Day Christmas (Purple-Tall) ",
        tag: "Latest8",
        price: 35.99,
        inCart: 0
    },
    {
        name: "Dragon Glassware Cocktail Glasses, Lead-Free Insulating Double Walled Bar Mixing Glasses, Comes in Luxury Gift Packaging",
        tag: "exclusive",
        price: 28.99,
        inCart: 0
    },
    {
        name: "Dragon Glassware Diamond Whiskey Decanter, Lead-Free Crystal Clear Glass, with 2 Diamond Glasses and Black Base, Comes in Luxury Gift Packaging",
        tag: "exclusive1",
        price: 19.99,
        inCart: 0
    },
    {
        name: "LANTREE Crystal Tea Cup Coffee Mug with Lid Saucer Spoon Birthday Christmas Gift for Women Friends Female Grandma Mum Sister Home Decoration(Short Red) ",
        tag: "Latest9",
        price: 35.99,
        inCart: 0
    },
    {
        name: "6 Tall Drinking Glasses Lemons Decal 8 fl oz Juice Glass Highball Tumbler ",
        tag: "Latest",
        price: 25.99,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><icon-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.png" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${item.inCart * item.price}</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total Amount(After Discount)</h4>
                <h4 class="basketTotal">$${cart}</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product icon-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
