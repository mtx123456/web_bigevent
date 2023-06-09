$(function(){
    //点击去注册账号的链接
    $("#link_reg").on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value){
            // 通过形参拿到的是密码框中的内容
            // 还需要拿到再次确认密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password').val()
            if(pwd !== value){
                return '两次密码不一致!'
            }
        }
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登陆成功后得到的tiken字符串，保存到localstorage中
                localStorage.setItem('token',res.token)
                console.log(res.token)
                // 跳转到后台页面
                location.href='./index.html'
            }
        })
    })
})