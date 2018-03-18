var a = require("../../utils/util.js");
Page({ 
  data: { 
    itemFooter: { 
      message: "首页" 
    }, 
    calenArray:[
      {
        id:1,
        date:'1月',
        title: '春节',
        brief: '中华民族传统节日,中华民族传统节日,中华民族传统节日,中华民族传统节日,中华民族传统节日,中华民族传统节日,中华民族传统节日',
        g: false
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: false
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: false
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      },
      {
        id: 2,
        date: '2月2日',
        title: '二月二',
        brief: '龙抬头',
        g: true
      }
    ], 
    loading: 0 
  }, 
  onLoad: function () { 
    var t = this; 
    /*a.ajax({ 
      url: "act/actapi/list", 
      data: { 
        material_type: 1, 
        p: 1, 
        page_size: 200 
      }, 
      header: { 
        "content-type": "application/json" 
      }, 
      success: function (a) { 
        var e = a.data.list; 
        t.setData({ 
          calenArray: e, 
          loading: 1 
        }) 
      } 
    }) */
  }, 
  durationChange: function (a) { 
    this.setData({ 
      duration: a.detail.value 
    }) 
  } 
})