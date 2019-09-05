Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Area')
  return query.find({ useMasterKey: true })
});
Parse.Cloud.define('getSpec', function (request) {
  let areaName = request.area
  let areaObj = getArea(areaName)
  areaObj.low = areaObj.get('frequencies')[0]
  areaObj.high = areaObj.get('frequencies')[1]
  return { "low": areaObj.low, "high": areaObj.high}
})
function getArea(areaName) {
  const query = new Parse.Query('Area')
  query.equalTo('name', areaName)
  return query.first()
}
function getSpecs() {
  const query = new Parse.Query('Specs')
  return query.first().get('spectrum')
}