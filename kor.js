let cart = [];
let totalAmount = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalAmount += price;

    // ອັບເດດຈຳນວນສິນຄ້າໃນໄອຄອນກະຕ່າ
    document.getElementById('cart-count').innerText = cart.length;

    // ລວມລາຍຊື່ສິນຄ້າທັງໝົດໃນກະຕ່າ
    let productNames = cart.map(item => item.name).join(', ');
    document.getElementById('order-list').value = productNames;

    // ອັບເດດລາຄາລວມທັງໝົດ
    document.getElementById('total-price').value = totalAmount.toLocaleString() + ' ກີບ';

    alert('ເພີ່ມ ' + productName + ' ໃສ່ກະຕ່າແລ້ວ!');
}

function submitOrder() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let status = document.getElementById('status');

    if (name === "" || phone === "" || cart.length === 0) {
        status.innerText = "❌ ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ ແລະ ເລືອກສິນຄ້າກ່ອນ!";
        status.style.color = "red";
    } else {
        status.innerText = "🥳 ສັ່ງຊື້ສິນຄ້າສຳເລັດແລ້ວ! ຂອບໃຈທີ່ໃຊ້ບໍລິການ";
        status.style.color = "green";
        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('address').value = "";
        document.getElementById('order-list').value = "ຍັງບໍ່ມີສິນຄ້າ";
        document.getElementById('total-price').value = "0 ກີບ";
        document.getElementById('cart-count').innerText = "0";

        cart = [];
        totalAmount = 0
    }
}