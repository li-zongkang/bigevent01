$.ajaxPrefilter(function(options) {
    // 添加根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // 添加headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        if (!res.responseJSON) {
            let jsondata = JSON.parse(res.responseText)
            if (jsondata.status === 1 && jsondata.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})