// 1. ຂໍ້ມູນສິນຄ້າ 10 ຢ່າງ
const productsData = [
    { id: 1, name: "ເກີບ Nike Air", price: 850000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 2, name: "ໂມງ Smart Watch", price: 1200000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 3, name: "ຫູຟັງ Bluetooth", price: 450000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 4, name: "ແວ່ນຕາກັນແດດ", price: 250000, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
    { id: 5, name: "ກະເປົ໋າເປ້", price: 350000, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { id: 6, name: "ໝວກແກັບ", price: 95000, img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400" },
    { id: 7, name: "ເສື້ອຢືດ Cotton", price: 120000, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400" },
    { id: 8, name: "ກ້ອງຖ່າຍຮູບ", price: 5500000, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
    { id: 9, name: "ລຳໂພງ Marshall", price: 2800000, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400" },
    { id: 10, name: "ຄີບອດ Mechanical", price: 650000, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400" }
];

let basket = [];
const productList = document.getElementById('product-list');

// 2. ສະແດງສິນຄ້າທັງໝົດເທິງໜ້າເວັບ
productsData.forEach(p => {
    productList.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString()} ກີບ</p>
            <button onclick="addToCart('${p.name}', ${p.price})">ເພີ່ມລົງກະຕ່າ</button>
        </div>
    `;
});

// 3. ຟັງຊັນເພີ່ມສິນຄ້າ
function addToCart(pName, pPrice) {
    basket.push({ name: pName, price: pPrice });
    renderUI();
}

// 4. ຟັງຊັນອັບເດດໜ້າຈໍ
function renderUI() {
    const cartCount = document.getElementById('cart-count');
    const cartListText = document.getElementById('cart-list-text');
    const finalTotalText = document.getElementById('final-total-text');

    cartCount.innerText = basket.length;

    if (basket.length === 0) {
        cartListText.innerText = "ຍັງວ່າງເປົ່າ";
        finalTotalText.innerText = "0";
    } else {
        const names = basket.map(item => item.name).join(", ");
        cartListText.innerText = names;

        const total = basket.reduce((sum, item) => sum + item.price, 0);
        finalTotalText.innerText = total.toLocaleString();
    }
}

// 5. ຟັງຊັນລ້າງກະຕ່າ
function resetCart() {
    basket = [];
    renderUI();
}

// 6. ຟັງຊັນຢືນຢັນການຊື້
function confirmPurchase() {
    const name = document.getElementById('custName').value;
    if (basket.length === 0) {
        alert("ກະລຸນາເລືອກສິນຄ້າກ່ອນ!");
        return;
    }
    if (!name) {
        alert("ກະລຸນາປ້ອນຊື່ຜູ້ຊື້!");
        return;
    }
    alert("ຂອບໃຈ " + name + " ທີ່ສັ່ງຊື້ສິນຄ້າກັບເຮົາ!");
    resetCart();
}
function renderUI() {
    document.getElementById('cart-count').innerText = basket.length;

    let total = basket.reduce((s, i) => s + i.price, 0);
    document.getElementById('final-total-text').innerText = total.toLocaleString() + " ກີບ";

    let nameList = basket.map(item => item.name).join(", ");
    document.getElementById('cart-list-text').innerText = basket.length > 0 ? nameList : "ຍັງວ່າງເປົ່າ";
}

function resetCart() {
    if (confirm("ລ້າງກະຕ່າສິນຄ້າ?")) {
        basket = [];
        renderUI();
    }
}

function confirmPurchase() {
    const name = document.getElementById('custName').value;
    const tel = document.getElementById('custTel').value;
    const loc = document.getElementById('custLoc').value;
    const total = document.getElementById('final-total-text').innerText;

    if (!name || !tel || basket.length === 0) {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ ແລະ ເລືອກສິນຄ້າ!");
        return;
    }

    const orderData = {
        name,
        tel,
        loc,
        items: basket,
        total,
        date: new Date().toLocaleString()
    };

    // ເກັບຂໍ້ມູນລົງໃນ localStorage ເພື່ອໄປດຶງໃຊ້ໃນໜ້າ receipt.html
    localStorage.setItem('myOrder', JSON.stringify(orderData));

    // ຍ້າຍໄປໜ້າໃບເສັດ
    window.location.href = 'receipt.html';
}