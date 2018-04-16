
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('userJoinRequest', function(request, response) {
	
  var params = request.params;
  var customData = params.customData;
  var requestUserId = params.user;
  var userQuery = new Parse.Query(Parse.User);
    var user = userQuery.equalTo("objectId", requestUserId);

  if (!customData) {
    response.error("Missing customData!")
  }
  if (!requestUserId) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(customData).sender;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", sender);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": user.get('username') + " requested to join your match !" },
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("email")) {
    response.error("email is required for signup");
  } else {
    response.success();
  }
});