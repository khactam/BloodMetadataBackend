Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Area')
  return query.find({ useMasterKey: true })
});