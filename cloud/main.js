Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Area')
  return query.find({ useMasterKey: true })
});
async function getArea (areaName) {
  let query = new Parse.Query('Area')
  query.equalTo('name', areaName)
  return query.first({ useMasterKey: true })
}
async function getSpecs (_lowAndHigh) {
  const query = new Parse.Query('Specs')
  let specObj = await query.first()
  let spectrum = specObj.get('spectrum')
  let lowAndHigh = _lowAndHigh
  let filteredData = spectrum.filter((spectrum, index, array) => {
    return array[index] >= lowAndHigh.low && array[index] <= lowAndHight.high
  })
  return filteredData
}
Parse.Cloud.define('getSpec', async function (request) {
  let areaName = request.params.area
  let areaObj = await getArea(areaName)
  let frequencies = areaObj.get('frequencies')
  areaObj.low = frequencies[0]
  areaObj.high = frequencies[1]
  let filteredSpec = await getSpecs(areaObj)
  return filteredSpec
})
