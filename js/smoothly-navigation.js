!function () {
    // 滚动到指定元素
    var view = document.querySelector('.topNavBar')
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop

            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop // 路程
            var coords = { y: currentTop }; // 起始位置
            var t = Math.abs((s / 100) * 300) // 时间
            if (t > 500) { t = 500 }
            var tween = new TWEEN.Tween(coords) // 起始位置
                .to({ y: targetTop }, t) // 结束位置 和 时间
                .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
                .onUpdate(function () {
                    // coords.y 已经变了
                    window.scrollTo(0, coords.y) // 如何更新界面
                })
                .start(); // 开始缓动
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('.topNavBar nav > ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (x) {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }.bind(this)
            }
        },
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
    }

    controller.init(view)

}.call()

