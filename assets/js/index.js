$(function(){

    // 调用getUserInfo)(获取用户的基本信息
    getUserInfo()
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        Headers:{
            Authorization: localStorage.getItem('token')||''
        },
        success:function(res){
           if(res.status !==0){
            return layui.layer.msg('获取用户信息失败！')
           }
           renderAvatar()
        }
    })
}


// 渲染用户的头像
function renderAvatar(user){
    // 获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需求渲染用户的头像
    if(user.user.pic !== null){
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

