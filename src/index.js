require('avalon2');
require('assets/router/mmRouter');
require('jquery');
// styles
require('styles/index.less');
// 接口调用
var api = require('api/index');
// 常用组件
require('components/header');


// 关闭调试模式
avalon.config({debug: true, interpolate: ['{$','$}']})
// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
  $id: "leadbank",
  header: require('components/header.html'),
  footer: require('components/footer.html'),
  currPath: '',// 当前路径
  currPage: '',// 当前页面
  config: {}
});

// 存储子页面VM、Dom
var states = {};
function addState(path, vm, html) {
    states[path] = {
        vm: vm,
        html: html
    }
}
// var NowPage = {
//     currJs: 'views/404.js',// 当前页面js
//     currHtml: 'views/404.html'// 当前页面
// }
// //添加路由规则
// avalon.router.add("/404", function (a) {
//     root.currPath = this.path;
//     root.currPage = getPage(this.path);
//     // this里面能拿到如下东西:
//     // path: 路径
//     // query: 一个对象，就是？后面的东西转换成的对象
//     // params: 一个对象， 我们在定义路由规则时，那些以冒号开始的参数组成的对象
// })
// avalon.router.add("/ucenter/index", function (a) {
//     root.currPath = this.path;
//     root.currPage = getPage(this.path);
// })


// 创建组件
avalon.component('ms-view', {
    template: '<div :html="@page" class="ms-view"></div>',
    defaults: {
        page: '&nbsp;',
        path: 'no',
        onReady: function(e) {
            // 取出当前state对象
            var state = states[e.vmodel.path];
            avalon.vmodels[state.vm.$id] = state.vm;
            setTimeout(function() {//必须等它扫描完这个template,才能替换
                e.vmodel.page = state.html;
            },100)
        },
        onDispose: function(e) {
            // 移除组件 清空状态
            var state = states[e.vmodel.path];
            delete avalon.vmodels[state.vm.$id]
        }
    }
});

function getPage(path) {
    path = path.slice(1);
    var html = '<xmp is="ms-view" class="view-container" ms-widget="{path:\'' + path + '\',page: @page}"></xmp>';
    return html
}


var pages = ["404","ucenter/index"];
pages.forEach(function(pathname) {
    var html = require('views/' + pathname + '.html');
    var vm = require('views/' + pathname + '.js');
    addState(pathname, vm, html);
    avalon.router.add("/"+pathname, function(a) {
        root.currPath = this.path;
        root.currPage = getPage(this.path);
    })
});


avalon.history.start({
    root: "/"
})
avalon.scan(document.body)

// var a = {test: '123'};
// alert(JSON.stringify(a));
// $('div').attr('id','test');
// api.getProductDetail();
