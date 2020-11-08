const API = 'http://13.212.150.43/api/v1/sanphams';
const blockListSanPham = document.getElementById('list_sanpham');
start();

function start() {
    getSanphams(renderSanphams);
}

function getSanphams(callback) {
    fetch(API).then(res => {
        return res.json();
    }).then(callback);
}

function renderSanphams(sanphams) {
    sanphams.data.sort(function (a, b) {
        if (a.ma < b.ma) { return -1; }
        if (a.ma > b.ma) { return 1; }
        return 0;
    });
    var htmls = sanphams.data.map(sp => {
        return `
        <tr id="item-${sp.ma}">
            <td scope="row">${sp.ma}</td>
            <td>${sp.ten}</td>
            <td>${sp.soluong}</td>
            <td><button onclick="showActionModal('${sp.ma}')" type="button" class="btn">...</button></td>
        </tr>
        `;
    });
    if (htmls.length == 0)
        htmls = ["<tr><td colspan='4'>Không có dữ liệu</td></tr>"];
    blockListSanPham.innerHTML = htmls.join('');
    $('#loading').css("display", "none");
}

function showActionModal(id) {
    const form = document.getElementById('formAction');
    $('#loading').css("display", "block");
    getSanPhamByID(id, function (data) {
        if (data.status === false) {
            var message = "kết nối server thất bại!";
            if (data.message)
                message = data.message;
            showAlertDanger(message);
        } else {
            $('#loading').css("display", "none");
            $('#modelId').modal('toggle');
            form.ma.value = data.data.ma;
            form.ten.value = data.data.ten;
        }
    })
}
function getSanPhamByID(id, callback) {
    fetch(API + '/' + id).then((res) => {
        return res.json();
    }).then(callback)
}
function handleDelete() {
    const form = document.getElementById('formAction');
    $('#modelId').modal('toggle');
    $('#loading').css("display", "block");
    deleteSanPhamById(form.ma.value, function (data) {
        if (data.status == true) {
            showAlertSuccess(data.message);
            getSanphams(renderSanphams);
        }
        else
            showAlertDanger(data.message);
        $('#loading').css("display", "none");
    });
}
function deleteSanPhamById(id, callback) {
    fetch(API + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json;"
        }
    }).then((res) => {
        return res.json();
    }).then(callback)
}

function showAlertSuccess(message) {
    document.getElementById('alert').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        <strong>${message}</strong>
    </div>
    `;
}

function showAlertDanger(message) {
    document.getElementById('alert').innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        <strong>${message}</strong>
    </div>
    `;
}