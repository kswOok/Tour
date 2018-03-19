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
        title: 'Science In Our Forests',
        brief: '走进森林里的科学，今年夏天在彩虹泉探索奇异，奇妙和实用的科学。Scion Crown 研究学会组织和引导森林展览',
        g: false
      },
      {
        id: 2,
        date: '2月',
        title: '罗托鲁瓦歌剧节',
        brief: '毛利族及太平洋、欧洲等地的声乐家于纽西兰毛利艺术手工艺中心的Rotorwhio大会堂献声。',
        g: false
      },
      {
        id: 3,
        date: '3月',
        title: 'NZ Division II Competition',
        brief: '游泳比赛是由新西兰游泳队举办的年度年龄组比赛，比赛在罗托鲁瓦国家水上运动中心举行',
        g: true
      },
      {
        id: 4,
        date: '4月',
        title: '罗托鲁瓦马拉松赛',
        brief: '这是新西兰历史最悠久、参加者最多(500多人)的马拉松赛，路线是罗托鲁瓦湖沿线。',
        g: false
      },
      {
        id: 5,
        date: '5月',
        title: '罗托鲁瓦钓鳟赛',
        brief: '罗托鲁瓦最重要的钓鱼竞赛，奖金高达五万纽币。若钓到作了标记的鳟鱼，还有特别的奖赏。参加人数限制为500人，报名还需趁早。',
        g: false
      },
      {
        id: 6,
        date: '6月',
        title: 'Screenprint Workshop: Print Your Own Poster!',
        brief: '本次研讨会提供了开始打印所需的所有知识，每个学生都将学习如何从头到尾创建自己的艺术作品',
        g: false
      },
      {
        id: 7,
        date: '7月',
        title: 'Friends of The Rotorua Library Book Sale',
        brief: '在罗托鲁瓦图书馆图书销售之友的数百本书中查找便宜货和珍宝。',
        g: false
      },
      {
        id: 8,
        date: '8月',
        title: 'Ice Skate Tour',
        brief: '滑冰之旅在新西兰周围环绕着最先进的人造溜冰场。它们看起来像冰，与天然冰具有97％的相同滑行能力。',
        g: false
      },
      {
        id: 9,
        date: '9月',
        title: 'Youth Section Rotorua Rock Mineral Fossil & Gem Club Meeting',
        brief: '罗托鲁瓦岩石矿物化石和宝石俱乐部通过开设青年部门来回应年轻人及其家人的兴趣。欢迎8-16岁的成人陪伴。',
        g: false
      },
      {
        id: 10,
        date: '10月',
        title: 'Operatunity Presents: Divas & Divos',
        brief: '一些新西兰最优秀的艺术家正在唱一些有史以来最着名的歌剧！',
        g: false
      },
      {
        id: 11,
        date: '11月',
        title: 'Friends of The Rotorua Library Book Sale',
        brief: 'Find bargains and treasures amongst the hundreds of books at the Friends of the Rotorua Library Book Sale.',
        g: false
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