function mergeNumber(dateArr) {
  let result = BigInt(0);
  let str = dateArr.toString();
  if (str.indexOf(',') === -1) {
    return Number(str);
  }

  const myArray = str.split(',');
  const len = myArray.length;
  for (let i = 0; i < len; i++) {
    result = BigInt(myArray[i]) | BigInt(result);
  }
  if(typeof result == 'bigint') result = result.toString()
  return result;
}

const getMergeNumber = async (ctx, next) => {
  const req = ctx.request.body;
  let res = '';
  console.log(req)
  if(req.params.list) {
    res = mergeNumber(req.params.list)
  }
  
  ctx.body = {
    data: res
  }
}

const splitNumber = async (ctx, next) => {
  const req = ctx.request.body;

  
}

module.exports = {
  getMergeNumber
}