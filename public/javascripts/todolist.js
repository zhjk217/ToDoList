var todolist = [];
var id = 1;
getList();

function getList() {
    var api = "/api/getList";
    $.get(api, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            //data.length 1~3
            //data _id
            newList(data[i]);
        }
    })
}

function addList() {
    var title = $('#title').val();
    var msg = $('#msg').val();
    if (title == "" || msg == "") {
        alert("請輸入標題和內容!");
    } else {
        var api = "/api/addList";
        var data = {
            "title": title,
            "msg": msg
        };
        $.post(api, data, function (res) {
            newList(res.data);
            $('#title').val('');
            $('#msg').val('');
        });
    }
}

function newList(data) {
    let status = (data.status) ? "checked" : "";
    let content =
        `<div class="input-group mb-3" id="${data._id}">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" id="checked${data._id}" lass="myCheck" onclick="checkStatus('${data._id}',this)">
            </div>
        </div>
        <input type="text" class="form-control col-sm-3" id="title${data._id}" name="${data.title}" value="${data.title}" readonly>

        <input type="text" class="form-control col-sm-9" id="msg${data._id}" name="${data.msg}" value="${data.msg}" readonly>
        
        <div class="input-group-append" id="button-addon4">
            <button class="btn-outline-secondary d-none" style=""type="button" id="up${data._id}" onclick="">上</button>
            <button class="btn-outline-secondary d-none" type="button" id="down${data._id}" onclick="">下</button>
            <button class="btn-outline-secondary d-none" type="button" id="jump${data._id}" onclick="">跳</button>
            <button class="btn-outline-secondary d-none" type="button" id="cmove${data._id}" onclick="cmoveList('${data._id}')">完成</button>
            <button class="btn-outline-secondary" type="button" id="btnMove${data._id}" onclick="moveList('${data._id}')">移動</button>
            <button class="btn-outline-secondary" type="button" id="btnEdit${data._id}" onclick="editList('${data._id}')">修改</button>
            <button class="btn-outline-secondary d-none" type="button" id="btnUpdate${data._id}" onclick="updateList('${data._id}')">更新</button>
            <button class="btn-outline-secondary" type="button" id="btnRemove${data._id}" onclick="removeList('${data._id}')">刪除</button>
        </div>
    </div>`
    // ` 重要符號
    $('.container').append(content);
    if(status=="checked"){
        $("#checked"+data._id).prop('checked', true);
        $('#title' + data._id).addClass("line-through");
        $('#msg' + data._id).addClass("line-through");
        $('#btnEdit' + data._id).addClass("d-none");
        $('#btnMove' + data._id).addClass("d-none");
    }
}

function editList(id) {
    $('#btnEdit' + id).addClass("d-none");
    $('#btnRemove' + id).addClass("d-none");
    $('#btnMove' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $("#checked"+ id).attr('disabled', true);
    $('#title' + id).attr("readonly", false);
    $('#msg' + id).attr("readonly", false);

}

function updateList(id) {
    var title = $("#title" + id).val();
    var msg = $("#msg" + id).val();
    var API = "/api/updateList";
    var data = {
        "id": id,
        "title": title,
        "msg": msg
    };
    $.post(API, data, function (res) {
        if (res.status == 0) {
            $('#btnEdit' + id).removeClass("d-none");
            $('#btnRemove' + id).removeClass("d-none");
            $('#btnMove' + id).removeClass("d-none");
            $('#btnUpdate' + id).addClass("d-none");
            $("#checked"+ id).attr('disabled', false);
            $('#title' + id).attr("readonly", true);
            $('#msg' + id).attr("readonly", true);
        }
    });
}

function removeList(id) {
    var API = "/api/removeList";
    var data = {
        "id": id
    };
    $.post(API, data, function (res) {
        if (res.status == 0) {
            alert("刪除成功!!!");
            $('#' + id).remove();
            //消前端
        }
    })
}

function checkStatus(id, checkStatus) {
    var API = "/api/checkStatus";
    var data = {
        "id": id,
        "status": checkStatus.checked
    };
    $.post(API, data, function (res) {
        if (res.status == 0) {
            if (checkStatus.checked) {
                $('#title' + id).addClass("line-through");
                $('#msg' + id).addClass("line-through");
                $('#btnEdit' + id).addClass("d-none");
                $('#btnMove' + id).addClass("d-none");
            } else {
                $('#title' + id).removeClass("line-through");
                $('#msg' + id).removeClass("line-through");
                $('#btnEdit' + id).removeClass("d-none");
                $('#btnMove' + id).removeClass("d-none");
            }
        }
    });
}
function moveList(id){
    $('#btnEdit' + id).addClass("d-none");
    $('#btnRemove' + id).addClass("d-none");
    $('#btnMove' + id).addClass("d-none");
    $('#up' + id).removeClass("d-none");
    $('#down' + id).removeClass("d-none");
    $('#cmove' + id).removeClass("d-none");
    $('#jump' + id).removeClass("d-none");
}
function cmoveList(id){
    $('#btnEdit' + id).removeClass("d-none");
    $('#btnRemove' + id).removeClass("d-none");
    $('#btnMove' + id).removeClass("d-none");
    $('#up' + id).addClass("d-none");
    $('#down' + id).addClass("d-none");
    $('#cmove' + id).addClass("d-none");
    $('#jump' + id).addClass("d-none");
}