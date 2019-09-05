Parse.Cloud.define('getArea', function (req, res) {
  const query = new Parse.Query('Test')
  query.find({ useMasterKey: true }).then((response) => {
    res.success(response)
  },(error) =>{
    console.log(error);
  })
});