$(function() {

    $('#link_login').on('click', function() {

        $('.login-box').hide();
        $('.res-box').show();
    });
    $('#link_reg').on('click', function() {
        $('.login-box').show();
        $('.res-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    // 自定义表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(val) {
            let pwd = $('.res-box [name="password"]').val();
            if (val != pwd) {
                return '两次密码不一致'
            }
        }
    })

    $('.res-box .layui-form').submit(function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('.res-box [name="username"]').val(),
            password: $('.res-box [name="password"]').val(),
        }, function(res) {
            if (res.status != 0) {
                return layer.msg('注册失败');
            }
            layer.msg('注册成功');
            $('#link_reg').click()
        })
    })

    $('.login-box .layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $('.login-box .layui-form').serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token);
                layer.msg('登录成功');
                location.href = '/index.html';
            }
        });
    })

})