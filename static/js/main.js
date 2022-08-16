// Sản phẩm
// Tab san pham
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("book-type");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    var y = document.getElementsByClassName("button-tab");
    for (i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = "white";
    }

    document.getElementById("b" + tabName + "").style.backgroundColor = "#0d6efd";
}

// Dat hang san pham
var itemList = {
    "kn1": {
        "name": "Kĩ năng đọc thông minh",
        "price": 21000,
        "photo": "static/media/image/sanpham/kn1.jpg",
    },
    "kn2": {
        "name": "Nhấc mông lên đừng ngồi đó mà mơ",
        "price": 22000,
        "photo": "static/media/image/sanpham/kn2.png",
    },
    "kn3": {
        "name": "Đừng để mâu thuẫn nhỏ gây hậu quả lớn",
        "price": 23000,
        "photo": "static/media/image/sanpham/kn3.jpg",
    },
    "kn4": {
        "name": "Tư duy phi đối xứng",
        "price": 24000,
        "photo": "static/media/image/sanpham/kn4.jpg",
    },
    "kn5": {
        "name": "Đừng để tiền ngủ yên trong túi",
        "price": 25000,
        "photo": "static/media/image/sanpham/kn5.jpg",
    },
    "kn6": {
        "name": "Hướng nghiệp trong thời đại 4.0",
        "price": 26000,
        "photo": "static/media/image/sanpham/kn6.jpg",
    },
    "gk1": {
        "name": "Luyện thi Olympic Toán - Maths Olympiad - Lớp 1",
        "price": 21000,
        "photo": "static/media/image/sanpham/gk1.png",
    },
    "gk2": {
        "name": "Luyện thi Olympic Tiếng Anh lớp 2",
        "price": 22000,
        "photo": "static/media/image/sanpham/gk2.jpg",
    },
    "gk3": {
        "name": "Luyện thi Olympic Toán - Maths Olympiad - Lớp 3",
        "price": 23000,
        "photo": "static/media/image/sanpham/gk3.png",
    },
    "gk4": {
        "name": "Luyện thi Olympic Toán - Maths Olympiad - Lớp 4",
        "price": 24000,
        "photo": "static/media/image/sanpham/gk4.png",
    },
    "gk5": {
        "name": "Luyện Thi Olympic Khoa Học Lớp 5",
        "price": 25000,
        "photo": "static/media/image/sanpham/gk5.jpg",
    },
    "tn1": {
        "name": "Giáo dục an toàn giao thông - Dành cho trẻ 4-5 tuổi - Đạp vịt thật là vui",
        "price": 21000,
        "photo": "static/media/image/sanpham/tn1.png",
    },
    "tn2": {
        "name": "Cừu con nhanh trí - Ngụ ngôn song ngữ (Tái bản)",
        "price": 22000,
        "photo": "static/media/image/sanpham/tn2.jpg",
    },
    "tn3": {
        "name": "Đừng tin lời gã cáo - Ngụ ngôn song ngữ (Tái bản)",
        "price": 23000,
        "photo": "static/media/image/sanpham/tn3.jpg",
    },
    "tn4": {
        "name": "Một cuộc thi chạy - Ngụ ngôn song ngữ (Tái bản)",
        "price": 24000,
        "photo": "static/media/image/sanpham/tn4.jpg",
    },
    "tn5": {
        "name": "Hai chú dê qua cầu - Ngụ ngôn song ngữ (Tái bản)",
        "price": 25000,
        "photo": "static/media/image/sanpham/tn5.jpg",
    },
    "tn6": {
        "name": "Con quạ thông minh - Ngụ ngôn song ngữ (Tái bản)",
        "price": 26000,
        "photo": "static/media/image/sanpham/tn6.jpg",
    }
};

function showNotify(){
    var x = document.getElementById("getnotify");
    x.classList.add("notify");
}

function addCart(code) {
    if (typeof (localStorage) !== 'undefined') {
        if (typeof localStorage[code] === 'undefined') {
            var number = parseInt(document.getElementById(code).value);
            window.localStorage.setItem(code, number);
            showNotify();
        }
        else {
            var current = parseInt(window.localStorage.getItem(code));
            if (current > 100) {
                alert('Số lượng sách mua mỗi loại tối đa là 100 cuốn');
                window.localStorage.setItem(code, 100);
            }
            else {
                var number = parseInt(document.getElementById(code).value);
                // var current = parseInt(window.localStorage.getItem(code));
                if (current + number > 100) {
                    alert('Số lượng sách mua mỗi loại tối đa là 100 cuốn');
                    window.localStorage.setItem(code, 100);
                }
                else {
                    window.localStorage.setItem(code, current + number);
                    showNotify();
                }
            }
        }
    } else {
        alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
    }
}

window.onstorage = () => { showCart(); };

function showCart() {
    var TotalPreTax = 0;
    var tbody = document.getElementById("details-order-body");
    tbody.innerHTML = "";
    var formater = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = itemList[key];
        var photo = item.photo;
        var name = item.name;
        var price = item.price;
        var orderNumber = localStorage.getItem(key);
        var cost = parseInt(price) * parseInt(orderNumber);
        if (orderNumber == 0) continue;

        var tr = document.createElement("tr");
        var dataPhoto = document.createElement("td");
        var dataName = document.createElement("td");
        var dataOrderNumber = document.createElement("td");
        var dataPrice = document.createElement("td");
        var dataCost = document.createElement("td");
        var remove = document.createElement("td");

        dataPhoto.innerHTML = "<img src = '" + photo + "' width='100px' class='round-figure'/>";
        dataName.innerHTML = "" + name + "";
        dataName.style.textAlign = "left";
        dataOrderNumber.innerHTML = "" + orderNumber + "";
        dataPrice.innerHTML = "" + formater.format(price) + "";
        dataCost.innerHTML = "" + formater.format(cost) + "";
        remove.innerHTML = "<i onclick=removeCart('" + key + "') class='fa-solid fa-trash-can'></i>";

        tr.appendChild(dataPhoto);
        tr.appendChild(dataName);
        tr.appendChild(dataOrderNumber);
        tr.appendChild(dataPrice);
        tr.appendChild(dataCost);
        tr.appendChild(remove);

        tbody.appendChild(tr);

        TotalPreTax = TotalPreTax + (price * orderNumber);
    }

    var discountRate = getDiscountRate();
    var discount = TotalPreTax * discountRate;
    var tax = 0.1 * (TotalPreTax - discount);
    var totalcost = TotalPreTax - discount + tax;
    document.getElementById('totalprice').innerHTML = "" + formater.format(TotalPreTax) + "";
    document.getElementById('discount').innerHTML = "" + formater.format(discount) + "";
    document.getElementById('tax').innerHTML = "" + formater.format(tax) + "";
    document.getElementById('totalcost').innerHTML = "" + formater.format(totalcost) + "";
}


function getDiscountRate() {
    var d = new Date();
    var weekday = d.getDate();
    var totalMins = d.getHours() * 60 + d.getMinutes();
    if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020)))
        return 1;
    else return 0;
}

function removeCart(code) {
    if (typeof window.localStorage[code] !== 'undefined') {
        window.localStorage.removeItem(code);
        showCart();
    }
}

// chat form
function show_hide_chat() {
    let x = document.getElementById("chat");
    if (x.style.display === 'none') {
        x.style.display = 'block';
        x.style.animation = 'display 1s ease-in-out';
    } else {
        x.style.display = 'none';
    }
}
let chatclose = document.getElementById("chat-close");
let chat = document.getElementById("chat");
chatclose.onclick = function () {
    chat.style.display = 'none';
}

//Đăng nhập
//modal
//dang ky
var modaldangky = document.getElementById("Modaldangky");
var btndangky2 = document.getElementById("open-form-dangky2");
var spandangky = document.getElementById("closemodaldangky");
//dang nhap
var modaldangnhap = document.getElementById("Modaldangnhap");
var btndangnhap1 = document.getElementById("open-form-dangnhap1");
var btndangnhap2 = document.getElementById("open-form-dangnhap2");
var spandangnhap = document.getElementById("closemodaldangnhap");


btndangky2.onclick = function () {
    modaldangky.style.display = "block";
    modaldangnhap.style.display = "none";
}
spandangky.onclick = function () {
    modaldangky.style.display = "none";
}
btndangnhap1.onclick = function () {
    modaldangnhap.style.display = "block";
    // modaldangky.style.display = "none";
}
btndangnhap2.onclick = function () {
    modaldangnhap.style.display = "block";
    modaldangky.style.display = "none";
}
spandangnhap.onclick = function () {
    modaldangnhap.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modaldangky) {
        modaldangky.style.display = "none";
    }
    if (event.target == modaldangnhap) {
        modaldangnhap.style.display = "none";
    }
}

function checkform(frm) {
    console.log(['frm']);
    if (frm.name != undefined) {
        if (frm.name.value === "") {
            alert("Vui lòng nhập họ tên !!!");
            return false;
        }
    }
    if (frm.email != undefined) {
        let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!frm.email.value.match(emailReg)) {
            alert("Vui lòng nhập Email đúng định dạng abc@xyz.com !!!!");
            return false;
        }
    }
    if (frm.matkhau != undefined) {
        if (frm.matkhau.value.length < 8) {
            alert("Vui lòng nhập mật khẩu từ 8 kí tự trở lên");
            return false;
        }
    }
    if (frm.xacnhanmatkhau != undefined) {
        if (!frm.xacnhanmatkhau.value.match(frm.matkhau.value)) {
            alert("Xác nhận mật khẩu sai !! Vui lòng nhập lại");
            return false;
        }
    }
    if (frm.noidungchat != undefined) {
        if (frm.noidungchat.value.length < 1) {
            alert("Vui lòng nhập tin nhắn của bạn !!!!");
            return false;
        }
    }
    return true;
}