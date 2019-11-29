$(function () {
    /*签到*/
    $("#SignIn").click(function () {
        var _this = this;
        /*
        * 签到时间:11月29日下午14:00——11月30日下午16：00
        * */
        var date = new Date().getTime();
        var beginTime = new Date(2019, 11, 29, 14).getTime();
        var endTime = new Date(2019, 11, 30, 16).getTime();
        if (date < beginTime && date > endTime) {
            alert('当前时间无法签到！')

        } else {
            $(_this).attr("disabled", "disabled");

            var fields = $("#sign_in_form input, select").serializeArray();

            var datas = {};
            $.each(fields, function (index, item) {
                //文本表单的值不为空才处理
                if (item.name != 'Jjcode') {
                    if (item.value && $.trim(item.value) != "") {
                        datas[item.name] = item.value;
                    }
                }
            });

            if (Object.keys(datas).length != 7) {
                alert("请填写完整签到信息！");
                $(_this).removeAttr("disabled");
            } else {
                var formdata = new FormData();
                formdata.append('Jjcode', $('#Jjcode').val());
                formdata.append('ts', new Date().getTime());
                for (var key in datas) {
                    if (key == 'Jjcode') {
                        formdata.set(key, datas[key]);
                    } else {
                        formdata.append(key, datas[key]);
                    }
                }
                /*
                 * 403:签到过了
                 * */
                $.ajax({
                    type: "POST",
                    url: "https://active.0717aier.com/v1/activetmp/sign",
                    /*
                    * 查询字符串，比如 key1=value1&amp;key2=value2 ，
                    * 映射，比如 {key1: 'value1', key2: 'value2'} 。
                    * 如果使用了后者的形式，则数据再发送器会被转换成查询字符串。设置processData选项为false来回避*/
                    data: formdata,
                    contentType: false,
                    processData: false,
                    success: function (msg) {
                        $(_this).removeAttr("disabled");
                        window.location.href = './success.html';
                    },
                    error: function (err) {
                        alert(err.responseJSON.error);
                        $(_this).removeAttr("disabled");
                        window.location.href = './chart.html';
                        console.log(err)
                    }
                });
            }
        }
    });


    /*下载图片*/
    $("#chartBtn").click(function () {
        window.location.href = './chart.html';
    });
});