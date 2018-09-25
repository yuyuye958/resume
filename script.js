// loading
setTimeout(function () {
    welcome.classList.remove('active')
}, 500)

// 导航栏滚动变化
window.onscroll = function () {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
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
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop
        window.scrollTo(0, top - 70)
    }
}

// 作品集切换
portfolio1.onclick = function () {
    portfolioBar.className = 'barState1'
}
portfolio2.onclick = function () {
    portfolioBar.className = 'barState2'
}
portfolio3.onclick = function () {
    portfolioBar.className = 'barState3'
}