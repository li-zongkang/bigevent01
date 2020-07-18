$(function() {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '与原密码一致'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码不一致'
            }
        }
    })
})