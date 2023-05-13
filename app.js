// ---Thêm biểu tượng loading trong quá trình tải dữ liệu từ API về.-------

$(window).on('load', function (event) {
    $('body').removeClass('preloading');
    $('.load').delay(200).fadeOut('fast');
})

// ---------TINH HUONG 1 top headline---------------------------------

topNew();

//--------click vào logo để tải lại trang chủ
$('.home').click(function () {
    topNew();
})

function topNew() {
    fetch("https://gnews.io/api/v4/top-headlines?token=f83e071b0a6058f0e4db51c9ebfcd997&lang=en")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (var product of data.articles) {
                renderProduct(product);
            }
        });
}

//Hàm tạo 1 khối tin tức
function renderProduct(product) {

    //lấy ra phần tử khối tin tức
    var bodyNew = $('#bodyNew').html();

    //thay thế các chuỗi trong khối tin tức thành các giá trị tương ứng
    bodyNew = bodyNew.replace("{{src}}", product.image);
    bodyNew = bodyNew.replace("{{title}}", product.title);
    bodyNew = bodyNew.replace("{{time}}", product.publishedAt);
    bodyNew = bodyNew.replace("{{description}}", product.description);

    var showNew = $('.showNew');
    //gán khói tin vào elm có class showNew
    $(bodyNew).appendTo(showNew);

    //-------TINH HUONG 3 (open url in new tab)------------

    $("a").on("click", function () {
        window.open(product.url, '_blank');
    });
}


// ---------------------TINH HUONG 2 tìm kiếm tin tức----------------------

$('.startSearch').click(function () {
    startSearch();
});

$('.keySubmit').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        startSearch();
    }
});

//ẩn-hiện các element có class = .tenClass và khi click vào các element có class = .tênClass

$('.searchInput').hide()
$('.overlay').hide()

$(".symbolSearch").click(function () {
    $('.searchInput').show()
    $('.overlay').show()
    $('.keySubmit').focus();
})

$(".symbolClose").click(function () {
    $('.searchInput').hide()
    $('.overlay').hide()
})

// --------------Hàm tìm kiếm---------------------
function startSearch() {
    //lay gia tri cua o input (keyword)
    var keyword = $('.keySubmit').val();

    fetch("https://gnews.io/api/v4/search?q=" + keyword + "&token=f83e071b0a6058f0e4db51c9ebfcd997&lang=en")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('.showNew').empty(); //xoa trang trang web
            if ((JSON.stringify(data)).includes(keyword) === false) {
                alert('Khong tim thay ket qua');
            } else {
                for (var product of data.articles) {
                    renderProduct(product);
                }
            }
            $('.keySubmit').val('');
        });

    $('.overlay').hide()
    $('.searchInput').hide()
}