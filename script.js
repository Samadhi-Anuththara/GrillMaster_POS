
// Product Details

const products = [

    {
        id: 1,
        name: "Cheese Burger",
        price: 850,
        icon: "🍔"
    },

    {
        id: 2,
        name: "Chicken Burger",
        price: 950,
        icon: "🍔"
    },

    {
        id: 3,
        name: "Double Burger",
        price: 1200,
        icon: "🍔"
    },

    {
        id: 4,
        name: "French Fries",
        price: 450,
        icon: "🍟"
    },

    {
        id: 5,
        name: "Coca Cola",
        price: 250,
        icon: "🥤"
    },

    {
        id: 6,
        name: "Ice Cream",
        price: 350,
        icon: "🍦"
    }

];


// Cart Array

let cart = [];


// Display Products

function displayProducts() {

    let productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(function(product) {

        productList.innerHTML += `

            <div class="product-card">

                <div class="product-icon">
                    ${product.icon}
                </div>

                <h3>${product.name}</h3>

                <p>Rs. ${product.price.toFixed(2)}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        `;

    });

}


// Add Products to Cart

function addToCart(id) {

    let product = products.find(function(item) {
        return item.id === id;
    });

    let cartItem = cart.find(function(item) {
        return item.id === id;
    });

    if (cartItem) {

        cartItem.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1

        });

    }

    displayCart();

}


// Display Cart

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item) {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `

            <tr>

                <td>${item.name}</td>

                <td>Rs. ${item.price.toFixed(2)}</td>

                <td>${item.quantity}</td>

                <td>Rs. ${subtotal.toFixed(2)}</td>

                <td>
                    <button class="remove-btn"
                    onclick="removeItem(${item.id})">
                        Remove
                    </button>
                </td>

            </tr>

        `;

    });

    document.getElementById("total").innerText =
        total.toFixed(2);
}


// Remove Item

function removeItem(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    displayCart();

}


// Clear Cart

function clearCart() {

    cart = [];

    displayCart();

}


// Start System

displayProducts();

displayCart();


// Customer Array

let customers = [];

let editingCustomerId = null;


// Add Customer

function addCustomer() {

    let name = document.getElementById("customerName").value;

    let phone = document.getElementById("customerPhone").value;

    if (name === "" || phone === "") {

        alert("Please enter customer details!");

        return;
    }

    if (editingCustomerId === null) {

        let customer = {

            id: Date.now(),
            name: name,
            phone: phone

        };

        customers.push(customer);

        alert("Customer Added Successfully!");

    } else {

        let customer = customers.find(function(item) {
            return item.id === editingCustomerId;
        });

        customer.name = name;
        customer.phone = phone;

        editingCustomerId = null;

        document.getElementById("customerBtn").innerText =
            "Add Customer";

        alert("Customer Updated Successfully!");

    }

    clearCustomerForm();

    displayCustomers();

}


// Display Customers

function displayCustomers() {

    let customerList = document.getElementById("customerList");

    customerList.innerHTML = "";

    customers.forEach(function(customer) {

        customerList.innerHTML += `

            <tr>

                <td>${customer.id}</td>

                <td>${customer.name}</td>

                <td>${customer.phone}</td>

                <td>

                    <button class="edit-btn"
                    onclick="editCustomer(${customer.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteCustomer(${customer.id})">
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


// Edit Customer

function editCustomer(id) {

    let customer = customers.find(function(item) {
        return item.id === id;
    });

    document.getElementById("customerName").value =
        customer.name;

    document.getElementById("customerPhone").value =
        customer.phone;

    editingCustomerId = id;

    document.getElementById("customerBtn").innerText =
        "Update Customer";

}


// Delete Customer

function deleteCustomer(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {

        customers = customers.filter(function(item) {
            return item.id !== id;
        });

        displayCustomers();

        alert("Customer Deleted Successfully!");

    }

}


// Clear Customer Form

function clearCustomerForm() {

    document.getElementById("customerName").value = "";

    document.getElementById("customerPhone").value = "";

}


// Display customers when system starts

displayCustomers();


// Product Editing ID

let editingProductId = null;


// Add Product

function addProduct() {

    let name = document.getElementById("productName").value.trim();

    let price = Number(document.getElementById("productPrice").value);

    let icon = document.getElementById("productIcon").value.trim();

    if (name === "" || document.getElementById("productPrice").value === "" || price <= 0) {

        alert("Please enter a valid product name and price!");

        return;
    }

    if (icon === "") {
        icon = "🍔";
    }

    if (editingProductId === null) {

        let product = {

            id: Date.now(),
            name: name,
            price: price,
            icon: icon

        };

        products.push(product);

        alert("Product Added Successfully!");

    } else {

        let product = products.find(function(item) {
            return item.id === editingProductId;
        });

        product.name = name;
        product.price = price;
        product.icon = icon;

        editingProductId = null;

        document.getElementById("productBtn").innerText =
            "Add Product";

        alert("Product Updated Successfully!");

    }

    clearProductForm();

    displayProducts();

    displayProductTable();

    document.getElementById("totalProducts").innerText =
        products.length;

}


// Display Product Table

function displayProductTable() {

    let productTableBody =
        document.getElementById("productTableBody");

    productTableBody.innerHTML = "";

    products.forEach(function(product) {

        productTableBody.innerHTML += `

            <tr>

                <td>${product.id}</td>

                <td>${product.icon} ${product.name}</td>

                <td>Rs. ${product.price.toFixed(2)}</td>

                <td>

                    <button class="edit-btn"
                    onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteProduct(${product.id})">
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


// Edit Product

function editProduct(id) {

    let product = products.find(function(item) {
        return item.id === id;
    });

    document.getElementById("productName").value =
        product.name;

    document.getElementById("productPrice").value =
        product.price;

    document.getElementById("productIcon").value =
        product.icon;

    editingProductId = id;

    document.getElementById("productBtn").innerText =
        "Update Product";

    document.getElementById("products").scrollIntoView();

}


// Delete Product

function deleteProduct(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {

        let index = products.findIndex(function(item) {
            return item.id === id;
        });

        if (index !== -1) {

            products.splice(index, 1);

        }

        // Remove deleted product from cart too

        cart = cart.filter(function(item) {
            return item.id !== id;
        });

        displayProducts();

        displayProductTable();

        displayCart();

        document.getElementById("totalProducts").innerText =
            products.length;

        alert("Product Deleted Successfully!");

    }

}


// Clear Product Form

function clearProductForm() {

    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("productIcon").value = "";

}


// Display Product Table when system starts

displayProductTable();
