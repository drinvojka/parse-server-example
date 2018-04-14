
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('pingReply', function(request, response) {
  var params = request.params;
  var customData = params.customData;

  if (!customData) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(customData).sender;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", sender);

  Parse.Push.send({
  where: query,
  channels : ['abcd'],
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": "The Giants scored!"},
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

Parse.Cloud.define('hellothere', function(req, res) {
Parse.Push.send({
  channels: ['abcd'],
  data: {
    alert: 'Test',
    badge: 1,
    sound: 'default'
  }
}, {
  success: function() {
    console.log('##### PUSH OK');
  },
  error: function(error) {
    console.log('##### PUSH ERROR');
  },
  useMasterKey: true
});
});