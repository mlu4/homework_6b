console.log("window opened");

if (document.querySelector('#order_button')) {
    document.querySelector('#order_button').addEventListener("click", function() {
        console.log("Order button clicked");
        location.href = "browse.html"
    });
}

if (document.querySelector('#orig')) {
    document.querySelector('#orig').addEventListener("click", function() {
        console.log("Original details clicked")
        location.href = "original_details.html"
    });
}

if (document.querySelector('#blackberry')) {
    document.querySelector('#blackberry').addEventListener("click", function() {
        location.href = "blackberry_details.html"
    });
}

if (document.querySelector('#walnut')) {
    document.querySelector('#walnut').addEventListener("click", function() {
        location.href = "walnut_details.html"
    });
}
    
if (document.querySelector('#gf')) {
    document.querySelector('#gf').addEventListener("click", function() {
        location.href = "original_gf_details.html"
    });
}

if (document.querySelector('#caramel')) {
    document.querySelector('#caramel').addEventListener("click", function() {
        location.href = "details.html"
    });
}

if (document.querySelector('#ps')) {
    document.querySelector('#ps').addEventListener("click", function() {
        location.href = "pumpkin_details.html"
    });
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

if (document.querySelector('.dropbtn')) {
    document.querySelector('.dropbtn').addEventListener('click', () => {
        document.querySelector('.dropbtn').classList.add('details_styling');
    });
}

if (document.querySelector('.cart_btn')) {
    document.querySelector('.cart_btn').addEventListener('click', () => {
        location.href = "checkout.html";
    });
}

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        var popup = document.querySelector('.adc_popup');
        if (popup.style.display="none") {
            popup.style.display="block";
        }
        else {
            popup.style.display="none";
        }
    });
}

if (document.querySelector('.payment_btn')) {
    document.querySelector('.payment_btn').addEventListener('click', () => {
        location.href = "payment.html";
    });
}

if (document.querySelector('.keep_shopping')) {
    document.querySelector('.keep_shopping').addEventListener('click', () => {
        location.href = "browse.html";
    });
}


// SHOPPING CART FUNCTIONALITY
// referenced: https://codepen.io/chrisachinga/pen/MWwrZLJ

var shoppingCart = (function() {
    cart = [];

    function Item(name, price, quantity, glaze) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.glaze = glaze;
    }

    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};

    obj.addToCart = function(name, price, quantity, glaze) {
        for (var item in cart) {
          if (cart[item].name === name && cart[item].glaze == glaze) {
            cart[item].quantity += quantity;
            saveCart();
            return;
          }
        }
        var item = new Item(name, price, quantity, glaze);
        cart.push(item);
        saveCart();
    }

    // REMOVE ITEM FROM CART
    obj.removeItemFromCartAll = function(name) {
        for(var item in cart) {
            console.log(cart[item].name);
            console.log(name);
          if(cart[item].name === name) {
            cart.splice(item, 1);
            break;
          }
        }
        saveCart();
    }

    // TOTAL QUANTITY
    obj.totalCount = function() {
        var totalQuantity = 0;
        for(var item in cart) {
          totalQuantity += cart[item].quantity;
        }
        return totalQuantity;
    }

    // TOTAL CART PRICE
    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
          totalCart += cart[item].price * cart[item].quantity;
        }
        return Number(totalCart.toFixed(2));
    }

    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
          item = cart[i];
          itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];
          }
          itemCopy.total = Number(item.price * item.quantity).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }
      return obj;
})();

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', function(event) {
        event.preventDefault();
        console.log("added to cart");
        var name = event.target.getAttribute('data-name');
        var price = Number(event.target.getAttribute('data-price'));
        var quantitySelect = document.getElementById('quantity');
        var quantity = Number(quantitySelect.options[quantitySelect.selectedIndex].value);
        var glazeSelect = document.getElementById('glaze');
        var glaze = glazeSelect.options[glazeSelect.selectedIndex].text;
        shoppingCart.addToCart(name, price, quantity, glaze);
        displayCart();
    });
}

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td class='item-details' id='cart-item'>" + cartArray[i].name + "</td>" 
        + "<td class='item-details' id='item-glaze'> Glaze: " + cartArray[i].glaze + "</td>"
        + "<td class='quantity'>" + cartArray[i].quantity + "</td>"
        + "<td class='price'>" + cartArray[i].total + "</td>"
        + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
        +  "</tr>";
    }

    if (document.querySelector('.show-cart')) {
        document.querySelector('.show-cart').innerHTML = output;
    }
    if (document.querySelector('.total-cart')) {
        document.querySelector('.total-cart').innerHTML = shoppingCart.totalCart();
    }
    if (document.querySelector('.total-count')) {
        document.querySelector('.total-count').innerHTML = shoppingCart.totalCount();
    }
    if (document.querySelector('.shipping-price')) {
        var subtotal = shoppingCart.totalCount();
        if (subtotal === 0) {
            document.querySelector('.shipping-price').innerHTML = 0.00;
        }
        else {
            var totalprice = shoppingCart.totalCart() + 2;
            document.querySelector('.shipping-price').innerHTML = totalprice;
        }
    }
}

const on = (selector, eventType, childSelector, eventHandler) => {
    const elts = document.querySelectorAll(selector)
    for (elt of elts) {
        elt.addEventListener(eventType, eventOnElement => {
            if (eventOnElement.target.matches(childSelector)) {
                eventHandler(eventOnElement)
            }
        })
    }
}

if (document.querySelector('.show-cart')) {
    on('.show-cart', 'click', '.delete-item', event => {
        var name = event.target.getAttribute('data-name');
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
    })
}

displayCart();
  
function menuSelect(a, b, c, d) {
    var select = document.getElementById("quantity");
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == c) {
            select.options[i].selected = true;
        }
    }
}