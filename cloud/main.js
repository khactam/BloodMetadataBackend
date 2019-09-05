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
  // areaObj.low = areaObj.get('frequencies')[0]
  // areaObj.high = areaObj.get('frequencies')[1]
  return areaObj
})
