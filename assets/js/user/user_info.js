$(function() {

    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用赋值函数layui内置
                form.val('formUserInfo', res.data)

            }
        })
    }

    $('#btnReset').click(function(e) {
        e.preventDefault();
        getUserInfo();
    })

    // 提交修改事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                window.parent.getUserInfo();
            }
        });
    })
})