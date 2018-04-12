// 引入mockjs
const Mock = require('mockjs');
Mock.setup({
  timeout: 1000
})

// 获取 mock.Random 对象
const Random = Mock.Random;

// 返回参数：
// {
// “STATUS”:”1-成功 0-失败“，
// “MESSAGE”:”消息“，
// ”DATAOBJ“：{“TOTAL”:”总数”，“ITEM”：【
// {
//   "ContractNo":"合同号",
//   "PO":"PO",
//   "StyleNo":"款号",
//   "IHDate":"IHDATE",
//   "CustName":"客户名称",
//   "FactName":"工厂名称",
//   "GenDanName":"跟单员"，
// “TotalQty”：“数量”
// }，{。。。。。}
// 】}
// }
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/GetSearchMakeContractList', 'post', function () {
  let total=33;
  let resData = {
    STATUS: 1,
    MESSAGE: Random.csentence(3, 10),
    DATAOBJ: {
      TOTAL: total,
      ITEM: [
      ]
    }
  };
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      ContractNo:Random.string(6,7),
      PO:Random.string(5,7),
      StyleNo:Random.string(5),
      IHDate:Random.date(),
      CustName:Random.name(),
      FactName:Random.name(),
      GenDanName:Random.name(),
      TotalQty:Random.integer(100,1000)
    }
    resData.DATAOBJ.ITEM.push(newArticleObject)
  }

  return resData;
});
