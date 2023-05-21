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
}

