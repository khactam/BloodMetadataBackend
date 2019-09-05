Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Test')
  query.find({ useMasterKey: true }).then((res) => {
    console.log(res);
  },(error) =>{
    console.log(error);
  })
  return "OK"
});