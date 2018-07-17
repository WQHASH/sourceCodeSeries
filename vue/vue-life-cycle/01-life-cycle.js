console.log("=========== vue的生命周期理解 ===========");
(function () {
    //var app = new Vue({
    //    el: "#app",
    //    data: { message: 'Hello Vue11!' },
    //    render(h) {
    //        console.log(h,"h")
    //    },

    //});


})();

(function () {

    console.log(ElementUI, "ElementUI ")
    new Vue({
        data: { message: 'Hello Vue!' },
        //在vue配置项中修改的  template中的模板优先级要高于outer HTML的优先级。
        template: "<h1>{{message +' 这是在template中的'}}</h1>", 
        // 这里通过render 来创建 综合排名优先级：render函数选项 > template选项 > outer HTML.
        render: function (createElement) {
            return createElement('h1', 'this is createElement')
        }

    }).$mount("#app");

    //https://zhuanlan.zhihu.com/p/33504700

})();

