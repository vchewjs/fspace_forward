/*
 * @Author: liuqi 
 * @Date: 2020-05-28
 * @Description: ice 接口转发。
 */
const iceGridInstanceName = "DRUG";
const iceGridInstanceNameTest = "ERP"; 
const SERVER_CONFIG ="ERP/Locator:tcp -h 47.106.100.121 -p 5061;DRUG/Locator:tcp -h reg.onekdrug.com -p 4061";
// const SERVER_CONFIG ="ERP/Locator:tcp -h 114.115.168.87 -p 5061;DRUG/Locator:tcp -h 114.115.168.87 -p 4061";

const serverIpHistory = "47.106.100.121";

const serverPortHistory = 4061;
const Ice = require("ice").Ice;
const inf = require("../../iceInterfaces").inf;

//
//


let communication_map = {}
var arr_map = SERVER_CONFIG.split(";")
arr_map.forEach(item=>{
  let arr = item.split('/')
  let connstr = [ "--Ice.Default.Locator=" + item,
  "idleTimeOutSeconds=300","--Ice.MessageSizeMax=4096"]
  communication_map[arr[0]] = Ice.initialize(connstr)
})

function asyncRefcallback(sn,moduleName, _IRequest) {
  return new Promise(function (resolve, reject) {
    let communication = communication_map[sn];
    Ice.Promise.try(function () {
      let proxy = communication.stringToProxy(moduleName);
      let remoteProxy = inf.InterfacesPrx.checkedCast(proxy);
      return remoteProxy;
    })
      .then(function (remoteProxy) {
        return remoteProxy.accessService(_IRequest);
      })
      .then(function (result) {
        resolve(result);
      })
      .exception(function (e) {
        console.log(e)
        reject(e);
      });
  });
}

const forwarded = async ctx => {
  try {
    let request = ctx.request.body;
    let iRequest = new inf.IRequest();
    iRequest.sn = request.sn||"DRUG";
    iRequest.cls = request.cls;
    iRequest.method = request.method;
    iRequest.param.pageIndex = request.pageIndex || 1;
    iRequest.param.pageNumber = request.pageNumber || 10;
    iRequest.param.arrays = request.arrays||request.arr || null;
    iRequest.param.json = JSON.stringify(request.params || {});
    iRequest.param.token = request.token||request.id || '';
    iRequest.param.extend = JSON.stringify({
            IType: request.extend || 0
          })
    ctx.body = await asyncRefcallback(
      iRequest.sn,
      request.serverName,
      iRequest
    );
  } catch (error) {
    ctx.body = {
      error: 1,
      info: error
    };
  }
};




//
//








// let communication;
let communicationHistory;

// const forwarded = async ctx => {
//   try {
//     let request = ctx.request.body;
//     console.log(request)
//     let iRequest = new inf.IRequest();
//     iRequest.cls = request.cls;
//     iRequest.method = request.method;
//     iRequest.param.pageIndex = request.pageIndex || 1;
//     iRequest.param.pageNumber = request.pageNumber || 10;
//     iRequest.param.arrays = request.arr || null;
//     iRequest.param.json = JSON.stringify(request.param || {});
//     iRequest.param.token = request.id;
//     iRequest.param.extend = JSON.stringify({
//       IType: request.extend || 0
//     })
//     ctx.body = await asyncRefcallback(
//       request.serverName,
//       iRequest,
//       serverIp,
//       serverPort
//     );
//   } catch (error) {
//     ctx.body = {
//       error: 1,
//       info: error
//     };
//   }
// };

const forwardedHistory = async ctx => {
  try {
    let request = ctx.request.body;
    let iRequest = new inf.IRequest();
    iRequest.cls = request.cls;
    iRequest.method = request.method;
    iRequest.param.pageIndex = request.pageIndex || 1;
    iRequest.param.pageNumber = request.pageNumber || 10;
    iRequest.param.arrays = request.arr || null;
    iRequest.param.json = JSON.stringify(request.param || {});
    iRequest.param.token = request.id;
    ctx.body = await asyncRefcallbackHistory(
      request.serverName,
      iRequest,
      serverIpHistory,
      serverPortHistory
    );
  } catch (error) {
    ctx.body = {
      error: -1,
      info: error
    };
  }
};

// function asyncRefcallback(moduleName, _IRequest, ip, port) {
//   return new Promise(function (resolve, reject) {
//     if (!communication) {
//       communication = Ice.initialize([
//         "--Ice.Default.Locator=" +
//         iceGridInstanceName +
//         "/Locator:tcp -h " +
//         ip +
//         " -p " +
//         port,
//         "idleTimeOutSeconds=300",
//         "--Ice.MessageSizeMax=4096"
//       ]);
//     }
//     Ice.Promise.try(function () {
//       let proxy = communication.stringToProxy(moduleName);
//       let remoteProxy = inf.InterfacesPrx.checkedCast(proxy);
//       return remoteProxy;
//     })
//       .then(function (remoteProxy) {
//         return remoteProxy.accessService(_IRequest);
//       })
//       .then(function (result) {
//         console.log('调用接口方法'+ _IRequest.method ,result)
//         resolve(result);
//       })
//       .exception(function (e) {
//         console.log(e)
//         reject(e);
//       });
//   });
// }

function asyncRefcallbackHistory(moduleName, req, ip, port) {
  return new Promise(function (resolve, reject) {
    if (!communicationHistory) {
      communicationHistory = Ice.initialize([
        "--Ice.Default.Locator=" +
        iceGridInstanceName +
        "/Locator:tcp -h " +
        ip +
        " -p " +
        port,
        "idleTimeOutSeconds=300",
        "--Ice.MessageSizeMax=4096"
      ]);
    }

    Ice.Promise.try(function () {
      let proxy = communicationHistory.stringToProxy(moduleName);
      let remoteProxy = inf.InterfacesPrx.checkedCast(proxy);
      return remoteProxy;
    })
      .then(function (remoteProxy) {
        return remoteProxy.accessService(req);
      })
      .then(function (result) {
        resolve(result);
      })
      .exception(function (e) {
        reject(e);
      });
  });
}

module.exports = {
  forwarded,
  forwardedHistory
};
