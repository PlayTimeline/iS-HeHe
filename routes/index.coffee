# GET home page.

menuList =[
  {"us": "home", "zh": "首页"},
  {"us": "about", "zh": "关于我们"},
  {"us": "services", "zh": "我们的服务"},
  {"us": "portfolio", "zh": "加入我们"},
  {"us": "contact", "zh": "联系我们"}
]

exports.index = (req, res) ->
  res.render('index', {title: '抢饭网', menus: menuList})