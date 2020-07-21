$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;
    initArtCateList();
    // 为添加类别注册事件
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });
    // 通过事件委托绑定form-add表单添加提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('添加失败')
                }
                initArtCateList();
                layer.msg('添加成功');
                layer.close(indexAdd);
            }
        });
    })

    // 事件委托绑定编辑事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')

        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('失败')
                }
                form.val('form-edit', res.data);

            }
        });
    })

    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('更新分类信息失败!')
                    }
                    initArtCateList();
                    layer.msg('更新分类信息成功!')
                    layer.close(indexEdit);
                }
            });
        })
        // 事件委托绑定删除事件
    $('tbody').on('click ', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败!')
                    }
                    initArtCateList();
                    layer.msg('删除成功!')
                    layer.close(index);
                }
            });


        });
    })
})
















function initArtCateList() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('获取数据失败')
            }
            var htmlStr = template("tel_table", res);
            $('tbody').html(htmlStr)
        }
    });


}