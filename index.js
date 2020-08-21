var soap = require("soap");
var url = "http://example.com/wsdl?wsdl";
var args = { name: "value" };
var request = require("request");

var specialRequest = request.defaults({
  agentOptions: {
    ca: [
      fs.readFileSync(path.resolve(__dirname, "./assets/formatted.crt")), //path of CA cert file
      fs.readFileSync(path.resolve(__dirname, "./assets/formatted2.crt")), //path of CA cert file
    ],
  },
});

soap
  .createClientAsync(url, {
    request: specialRequest,
  })
  .then((client) => {
    var options = {
      passwordType: "PasswordText",
      hasTimeStamp: true,
    };
    var wsSecurity = new soap.WSSecurity(
      config.username,
      config.password,
      options
    );
    client.setSecurity(wsSecurity);
  })
  .then((result) => {
    console.log(result);
  });
