// 导航栏滚动变化
// 添加 offset 类
let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
}

setTimeout(function () {
    findClosest()
}, 100)

window.onscroll = function () {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()
}

function findClosest() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
    // minIndex 就是距离窗口顶部最近的元素
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for (let i = 0; i < brothersAndMe.length; i++) {
        brothersAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}



// 导航栏二级菜单
let liTags = document.querySelectorAll('.topNavBar nav > ul > li')
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }
}

// 滚动到指定元素
let aTags = document.querySelectorAll('.topNavBar nav > ul > li > a')
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop

        let currentTop = window.scrollY
        let targetTop = top - 75
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
    }
}

// 作品轮播
var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  })        