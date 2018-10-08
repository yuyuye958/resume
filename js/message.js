!function () {
    var view = document.querySelector('.message')
    var model = {
        // 初始化
        initAV: function () {
            var APP_ID = 'L52drH4CI0UGr3r1GPWjm4bb-gzGzoHsz';
            var APP_KEY = 's4rmnskDPuOmmzTMws3t3pV6';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        // 获取数据
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()  // Promise 对象
        },
        // 存储数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({  // Promise 对象
                'name': name,
                'content': content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
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
            this.model.save(name, content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }

    controller.init(view, model)
}.call()
