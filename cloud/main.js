Parse.Cloud.define('getArea', function(req, res) {
  let query = new Parse.Query('Area')
  query.find({ useMasterKey: true }).then((response) =>{
    return response
  }, (error) =>{
    console.log(error);
  })
});
