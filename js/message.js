!function () {
    var view = View('.message')

    var model = Model({ resourceName: 'Message' })

    var controller = Controller({
        init: function (view, model) {
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessages()
        },
        loadMessages: function () {
            // 批量获取
            model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                },
                function (error) {
                    alert('提交失败')
                }
            )
        },
        bindEvents: function () {
            //表单提交存储数据
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()
                this.saveMessages()
            }.bind(this))
        },
        saveMessages: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            if (content === '' || name === '') {
                document.querySelector('.notice').classList.add('noticeVisible')
            }else{
                document.querySelector('.notice').classList.remove('noticeVisible')
                this.model.save({ 'name': name, 'content': content }).then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                    console.log(object)
                })
            }
            
        }
    })


    controller.init(view, model)
}.call()
