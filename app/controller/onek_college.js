var fs = require('fs')

const mkdirSync = async (ctx, next) => {
  const req = ctx.request.body;

  exists = fs.existsSync("./college");

  if(!exists){
    fs.mkdirSync("./college");
  }

  let pageName = new Date().getTime()

  url = "./college/" + pageName + ".html"
  html = "./college/" + pageName + ".txt"
  fs.writeFileSync(url, req.param.context);
  fs.writeFileSync(html, req.param.context);
  let ipAdress = getIPAdress()
  ctx.body = {
    msg: '页面创建成功!',
    data: {
      html: `http://${ipAdress}:3005/college/${pageName}.html`,
      txt: `http://${ipAdress}:3005/college/${pageName}.txt`
    }
  }
}

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();　　
  for (var devName in interfaces) {　　　　
      var iface = interfaces[devName];　　　　　　
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }　　
  }
}

module.exports = {
  mkdirSync
}