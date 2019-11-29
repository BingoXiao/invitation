$(function () {
    /*    $("#sign_in_form").bind("submit", function (event) {
            var _this = this;

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
                    var event = event || window.event;
                    event.preventDefault(); // 兼容标准浏览器
                    window.event.returnValue = false; // 兼容IE6~8
                } else {
                    $(_this).removeAttr("disabled");
                    console.log('===========true')
                    // window.location.href = './success.html'

                }
            }
        });

        $("#iframeContent").on("load", function() {
            var responseText = $("#iframeContent").contents().find("body").find("pre").text();
            console.log(responseText);
            //以下就可以判断并处理返回值
        });*/
    /*    function ajax_method(url, data, success) {
            var ajax = new XMLHttpRequest();
            ajax.open('post', url);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            // 判断data send发送数据
            if (data) {
                ajax.send(data);
            } else {
                ajax.send();
            }
            // 注册事件
            ajax.onreadystatechange = function () {
                // 在事件中 获取数据 并修改界面显示
                if (ajax.readyState == 4 && ajax.status == 200) {
                    success(ajax.responseText);
                }
            }
        }


        $("#SignIn").click(function (event) {
            var _this = this;
            /!*$(_this).attr("disabled", "disabled");

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

           /!*if (Objekeys(datas).length != 7) {
               alert("请填写完整签到信息！");
               $(_this).removeAttr("disabled");
           } else {
               $(_this).removeAttr("disabled");
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
           }*!/

            var form = document.getElementsByTagName("form")[0];
            var formdata = {};
            for (var i = 0; i < form.elements.length; i++) {
                var feled = form.elements[i];
                switch (feled.type) {
                    case undefined:
                    case 'button':
                    case 'file':
                    case 'reset':
                    case 'submit':
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (!feled.checked) {
                            break;
                        }
                    default:
                        if (formdata[feled.name]) {
                            formdata[feled.name] = formdata[feled.name] + ',' + feled.value;
                        } else {
                            formdata[feled.name] = feled.value;

                        }
                }
            }
            console.log(formdata);
            ajax_method('https://active.0717aier.com/v1/activetmp/sign', formdata, function (res) {
                console.log(res)
                $("#error").text(res)
            });
        });*/

    /*签到*/
    $("#SignIn").click(function () {
        var _this = this;
        /*
        * 签到时间:11月29日下午14:00——11月30日下午16：00
        * */
        // var date = new Date().getTime();
        // var beginTime = new Date(2019, 11, 29, 14).getTime();
        // var endTime = new Date(2019, 11, 30, 16).getTime();
        // if (date < beginTime && date > endTime) {
        //     alert('当前时间无法签到！')
        //     return
        // }

        // $(_this).attr("disabled", "disabled");

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
                // async: false,
                /*
                * 查询字符串，比如 key1=value1&amp;key2=value2 ，
                * 映射，比如 {key1: 'value1', key2: 'value2'} 。
                * 如果使用了后者的形式，则数据再发送器会被转换成查询字符串。设置processData选项为false来回避*/
                data: formdata,
                contentType: false,
                processData: false,
                cache: false,
                success: function (msg) {
                    // $(_this).removeAttr("disabled");
                    window.location.href = './success.html';
                },
                error: function (err) {
                    if (err.status == 403) {
                        alert(err.responseJSON.error)
                    }
                    console.log(err)
                    // $(_this).removeAttr("disabled");
                    window.location.href = './chart.html';
                }
                /* complete: function (res) {
                     console.log(res);
                     $("#error").text(res.status + '******' + res.responseText);
                 }*/
            });
        }
    });


    /*下载图片*/
    $("#chartBtn").click(function () {
        window.location.href = './chart.html';
    });
});