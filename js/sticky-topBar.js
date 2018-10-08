!function () {
    // 导航栏滚动变化
    var view = document.querySelector('#topNavBar')

    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            var view = this.view
            window.addEventListener('scroll', function (x) {
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            }.bind(this))  // 如果用箭头函数，就不用绑this了
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        },
    }

    controller.init(view)
}.call()
