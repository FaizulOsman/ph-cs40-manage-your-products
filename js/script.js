const inputValue = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    input.value = "";
    return value;
}

const addProduct = () => {
    const product_name = inputValue("product-name");
    const product_quantity = inputValue("product-quantity");

    if (!isNaN(product_name) || !Number.isInteger(Number(product_quantity))) {
        console.warn('Your input is wrong')
    }

    /* ===== As an array ===== */
    // const getProducts = JSON.parse(localStorage.getItem('products'))
    // if (getProducts) {
    //     const product = [...getProducts, {
    //         name: product_name,
    //         quantity: product_quantity
    //     }]
    //     localStorage.setItem('products', JSON.stringify(product))
    // } else {
    //     const product = [{
    //         name: product_name,
    //         quantity: product_quantity
    //     }]
    //     localStorage.setItem('products', JSON.stringify(product))
    // }



    /* ===== As an Object ===== */
    const getProducts = JSON.parse(localStorage.getItem('all_products'))
    const product = {}
    if (getProducts) {
        // When product is already here
        if (getProducts[product_name]) {
            getProducts[product_name] = Number(getProducts[product_name]) + Number(product_quantity)
            // Warning
            if (getProducts[product_name] < 0) {
                console.warn('Products can not be less then 0');
                return;
            } else if (getProducts[product_name] === 0) {
                console.warn('Stock out')
            }
        } else {
            getProducts[product_name] = product_quantity
        }
        // Set products
        localStorage.setItem('all_products', JSON.stringify(getProducts))
    } else {
        // Set products
        product[product_name] = product_quantity
        localStorage.setItem('all_products', JSON.stringify(product))
    }

    // Call display function
    display();
}
// Get All Products
const getLocalStorageData = () => {
    const products = localStorage.getItem("all_products");
    const parseProducts = JSON.parse(products);
    return parseProducts;
}

// Display Products
const display = () => {
    const products = getLocalStorageData();

    const section = document.getElementById("all-products");
    section.textContent = "";

    for (const product in products) {
        const name = product;
        const quantity = products[product];

        const div = document.createElement("div");
        div.innerHTML = `<div class="shadow-sm p-3 mb-2 bg-body rounded">
            <span class="fs-4">${name}</span>
            Quantity:<small class="fw-bold">
                ${quantity}
            </small>
        </div>`;
        section.appendChild(div);
    }
}
display();