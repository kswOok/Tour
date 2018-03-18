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
        title: 'Autauhinera姐妹健康联盟活动',
        brief: '在这个草根组织发起成立80年后，在蒂罗拉瓦湖区议会广场举办记录Te Arawa妇女健康联盟的展览。',
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
        title: 'Re:Live Exhibition',
        brief: '与英国Screenprint艺术家Sophie Perry一起旅程，重新构思大学项目简介，探索从当时到现在，她对该项目的解读之间的差异。',
        g: false
      },
      {
        id: 5,
        date: '5月',
        title: '回忆的艺术',
        brief: '突出本地艺术学生的杰出才能，本次展览将展示“艺术记忆-TePūo Mahara竞赛”的获奖者和决赛选手。约30幅作品的展览将于2018年4月21日至5月25日在艺术村展出。',
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