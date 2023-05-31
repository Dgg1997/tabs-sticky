const app = getApp();
Page({
  data: {
    scrollTopNew: 0,  //滚动距离
    stickyTopHeight: 0, //tabs距离顶部的高度
    navT: 0,  //自定义导航栏距离顶部margin-top
    navH: 0,   //自定义导航栏行高
    oneFixed: '', //吸顶样式
    list: [{   //tabs
        id: 0,
        title: '产品'
      },
      {
        id: 1,
        title: '团期'
      },
      {
        id: 2,
        title: '行程'
      },
      {
        id: 3,
        title: '费用'
      },
    ],
    currentIndex: 0, //当前选中tabs
    heightArr:[], //保存tabs对应内容距离顶部tabs
  },
  tabChange(e) {
    let selector = '#cont' + e.currentTarget.dataset.index
    let offsetTop = 50 + this.data.navT + this.data.navH
    wx.pageScrollTo({
      offsetTop: -offsetTop,
      selector: selector,
      duration: 400,
      success:function(e){
        console.log("成功",e)
      },
      file:function(e){
        console.log("失败",e)
      }
    })
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
    })
  },

  getNav: function () {
    let that = this
    const res = wx.getMenuButtonBoundingClientRect()
    that.setData({
      navT: res.top,
      navH: res.height
    })
  },

  getTopStickyHeight(){
    let that = this
    var query = wx.createSelectorQuery();
    query.select('#tabs').boundingClientRect();
    query.exec(function (rect) {
      that.setData({
        stickyTopHeight: rect[0].top
      })
    })
  },

  onPageScroll(event) {
    let that = this
    let scrollTopNew = event.scrollTop;
    
    let height = this.data.navT + this.data.navH
    if (event.scrollTop + height > this.data.stickyTopHeight) {
      let fixedStyle = [
        `top:${height}px`,
        'left: 0px',
        'right:0px',
        'position: -webkit-sticky',
        'position: sticky',
        'z-index: 5',
        'width: 100%',
        'background: #fff'
      ].join(';');
      that.setData({
        oneFixed: fixedStyle, //添加吸顶类
        scrollTopNew
      })
    } else {
      that.setData({
        oneFixed: '',
        scrollTopNew
      })
    }

    
    let heightArr = [...new Set(this.data.heightArr)]
    let top = scrollTopNew + height
    if(heightArr[0] > top){
      that.setData({
        currentIndex: 0
      })
    }else if(heightArr[1] > top){
      that.setData({
        currentIndex: 1
      })
    }else if(heightArr[2] > top){
      that.setData({
        currentIndex: 2
      })
    }else if(heightArr[3] > top){
      that.setData({
        currentIndex: 3
      })
    }
  },

  getConts(){
    let that = this
    var query = wx.createSelectorQuery();
    query.select('#cont0').boundingClientRect();
    query.select('#cont1').boundingClientRect();
    query.select('#cont2').boundingClientRect();
    query.select('#cont3').boundingClientRect();
    query.exec(function (rect) {
      console.log(rect)
      let arr = [rect[0].top,rect[1].top,rect[2].top,rect[3].top]
      that.setData({
        heightArr:arr
      })
    })
  },
  onLoad(optons) {
    let that = this
    that.getNav()
    that.getTopStickyHeight()
    that.getConts()
  },
  onShow() {

  },


})