// 注意：每次调用$.ajax()或$.get()\$.post()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
})