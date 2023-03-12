window.onload = function () {
  init()
}

function init() {
  initSnake(document.getElementById('snake_game'))
}

var initSnake = function (el) {
  var Snake = function () {
    // 初始化圆点数组
    this.snakeArr = [
      { x: 0, y: 0 },
      { x: 0, y: 20 },
      { x: 0, y: 40 },
      { x: 0, y: 60 },
      { x: 0, y: 80 },
      { x: 0, y: 100 },
    ]
    this.config = {
      t: null, // 计时器
      dir: 'DOWN', // 方向，默认向下行走
      wrapW: getStyles(el, 'width'), // 容器固定宽高
      wrapH: getStyles(el, 'height'),
    }
  }

  Snake.prototype = {
    init: function () {
      this.initSnake()
      this.bindEvent()
      this.createFood()
      return this
    },

    bindEvent: function () {
      addEvent(document, 'keydown', this.changeDir.bind(this))
    },

    initSnake: function () {
      var arr = this.snakeArr,
        len = arr.length,
        frag = document.createDocumentFragment(),
        item

      // 通过fragment来保存创建小圆点
      for (var i = 0; i < len; i++) {
        item = arr[i]
        var round = document.createElement('i')
        round.className = 'round'
        round.style.left = item.x + 'px'
        round.style.top = item.y + 'px'
        frag.appendChild(round)
      }
      el.appendChild(frag)
    },

    removeSnake: function () {
      // 删除全部的小圆点
      var rounds = el.getElementsByClassName('round')
      while (rounds.length > 0) {
        rounds[0].remove()
      }
    },

    run: function () {
      var self = this
      this.config.t = setInterval(function () {
        self.move()
      }, 500)
    },

    move: function () {
      var arr = this.snakeArr,
        len = arr.length

      for (var i = 0; i < len; i++) {
        // 控制头部向前移动，后续元素按照指针依次排列
        if (i === len - 1) {
          this.setHeadXY(arr)
        } else {
          arr[i].x = arr[i + 1].x
          arr[i].y = arr[i + 1].y
        }
      }
      this.eatFood(arr)
      this.removeSnake()
      this.initSnake()
      this.headInBody(arr)
    },

    setHeadXY: function (arr) {
      var head = arr[arr.length - 1]
      // 通过方向键来改变蛇行走方向的正负单位值
      switch (this.config.dir) {
        case 'LEFT':
          if (head.x <= 0) {
            head.x = this.config.wrapW - 20
          } else {
            head.x -= 20
          }
          break
        case 'UP':
          if (head.y <= 0) {
            head.y = this.config.wrapH - 20
          } else {
            head.y -= 20
          }
          break
        case 'RIGHT':
          if (head.x >= this.config.wrapW - 20) {
            head.x = 0
          } else {
            head.x += 20
          }
          break
        case 'DOWN':
          if (head.y >= this.config.wrapH - 20) {
            head.y = 0
          } else {
            head.y += 20
          }
          break
      }
    },

    // 改变方向方法
    changeDir: function (e) {
      var ev = e || window.event,
        code = ev.keyCode

      this.setDir(code)
    },

    setDir: function (code) {
      // 匹配键位，规则：蛇向下行走的方向不能改变为向上或向下
      switch (code) {
        case 37:
          if (this.config.dir !== 'LEFT' && this.config.dir !== 'RIGHT') {
            this.config.dir = 'LEFT'
          }
          break
        case 38:
          if (this.config.dir !== 'UP' && this.config.dir !== 'DOWN') {
            this.config.dir = 'UP'
          }
          break
        case 39:
          if (this.config.dir !== 'LEFT' && this.config.dir !== 'RIGHT') {
            this.config.dir = 'RIGHT'
          }
          break
        case 40:
          if (this.config.dir !== 'UP' && this.config.dir !== 'DOWN') {
            this.config.dir = 'DOWN'
          }
          break
      }
    },

    // 触碰身体游戏结束
    headInBody: function (arr) {
      var item,
        _self = this,
        headX = arr[arr.length - 1].x,
        headY = arr[arr.length - 1].y
      for (var i = 0; i < arr.length - 2; i++) {
        item = arr[i]
        if (item.x === headX && item.y === headY) {
          setTimeout(function () {
            _self.removeSnake()
            _self.reamoveFood()
            clearInterval(_self.config.t)
            alert('GAME OVER!')
          }, 400)
        }
      }
    },

    eatFood: function (arr) {
      var food = el.getElementsByClassName('food')[0],
        foodX = getStyles(food, 'left'),
        foodY = getStyles(food, 'top'),
        headX = arr[arr.length - 1].x,
        headY = arr[arr.length - 1].y,
        x,
        y

      // 判断头部圆点是否与食物的点位重合
      if (foodX === headX && foodY === headY) {
        this.reamoveFood()
        this.createFood()

        // 条件需要知道蛇行动的方向，在哪加
        // 首先判断蛇行动是横轴还是竖轴
        if (arr[0].x === arr[1].x) {
          x = arr[0].x
          // 竖向行走判断方向
          if (arr[0].y > arr[1].y) {
            y = arr[0].y + 20
          } else if (arr[0].y > arr[1].y) {
            y = arr[0].y - 20
          }
        } else if (arr[0].y === arr[1].y) {
          y = arr[0].y
          // 横向行走判断方向
          if (arr[0].x > arr[1].x) {
            x = arr[0].x + 20
          } else if (arr[0].x < arr[1].x) {
            x = arr[0].x - 20
          }
        }

        // 增加一个圆点
        this.snakeArr.unshift({ x, y })
      }
    },

    // 删除食物
    reamoveFood: function () {
      var food = el.getElementsByClassName('food')[0]
      food.remove()
    },

    // 创建食物
    createFood: function () {
      var foodElem = document.createElement('i')
      foodElem.className = 'food'
      // 实际的点位信息需要再乘以倍数
      foodElem.style.left = this.setRandomPos(this.config.wrapW) * 20 + 'px'
      foodElem.style.top = this.setRandomPos(this.config.wrapH) * 20 + 'px'
      el.appendChild(foodElem)
    },

    // 通过容器宽高的倍数 * 随机数来创建点位
    setRandomPos: function (wOrH) {
      // 每一个食物的圆点宽高都是 20 px
      // 这里需要求出食物圆点在容器盒子内占据多数倍，通过random开区间0-1在容器倍数中范围内处于哪个一点位
      return Math.floor(Math.random() * (wOrH / 20))
    },
  }

  return new Snake().init().run()
}
