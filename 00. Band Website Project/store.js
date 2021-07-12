console.log("Here")

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var addToCartButton = document.getElementsByClassName('btn btn-primary item-add-button')
    for (var i = 0; i < addToCartButton.length; i++) {
        var cartButton = addToCartButton[i]
        cartButton.addEventListener('click', addToCartClicked)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)

}

function purchase(event){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('class-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}



function addToCartClicked(event) {
    var buttonClicked = event.target
    var item = buttonClicked.parentElement.parentElement
    var title = item.getElementsByClassName('item-title')[0].innerText
    var price = item.getElementsByClassName('item-price')[0].innerText
    var imgSrc = item.getElementsByClassName('item-image')[0].src
    addToCart(title, price, imgSrc)
    updateCartTotal()
}

function addToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('class-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i <cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert('the items is already added')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-column cart-item">
        <img class="cart-item-image" src="${imgSrc}" alt="">
        <span class="cart-item-title">${title}</span>
    </div>    
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-remove" role="button"> Remove</button>
    </div>
    ` 
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value < 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemsContainer = document.getElementsByClassName('class-items')[0]
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Php', ''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText =  "Php " + total
}