Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Area')
  return query.find({ useMasterKey: true })
});
async function getArea (areaName) {
  let query = new Parse.Query('Area')
  query.equalTo('name', areaName)
  return query.first({ useMasterKey: true })
}
function getSpecs () {
  const query = new Parse.Query('Specs')
  return query.first().get('spectrum')
}
Parse.Cloud.define('getSpec', async function (request) {
  let areaName = request.params.area
  let areaObj = getArea(areaName)
  // let frequencies = areaObj.get('frequencies')
  // areaObj.low = frequencies[0]
  // areaObj.high = frequencies[1]
  // { "low": areaObj.low, "high": areaObj.high}
  return areaObj
})
