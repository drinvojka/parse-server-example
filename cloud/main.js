Parse.Cloud.define('decrementPlayersLeft', function(request, response) {
	
  var params = request.params;
  var customData = params.matchId;



  if (!customData) {
    response.error("Missing customData!")
  }
  else
  {
	 const query = new Parse.Query("Match");
     query.get(customData)
    .then(function(match) {
      match.increment("playersLeft",-1);
      match.save();
	  response.success("success")
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
 
  }
	   

});
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('userJoinRequest', function(request, response) {
	
  var params = request.params;
  var customData = params.customData;
  var requestUser = params.username;


  if (!customData) {
    response.error("Missing customData!")
  }


  var sender = JSON.parse(customData).sender;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", sender);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": requestUser + " requested to join your match !" },
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
Parse.Cloud.define("getServerTime", function(request, response) {
	
    var dateToday =  new Date();
    response.success(dateToday);
});
Parse.Cloud.define('requestAccepted', function(request, response) {
	
  var params = request.params;
  var customData = params.customData;
  var hostUser = params.username;


  if (!customData) {
    response.error("Missing customData!")
  }


  var sender = JSON.parse(customData).sender;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", sender);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": hostUser + " accepted your request to join the match !" },
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

 Parse.Push.send({
	  channels: [ "All" ],
	  data: {
	    alert: "The Giants won against the Mets 2-3."
	  }
	}, {
    useMasterKey: true
  })
  .then(function(red) {
    response.success(red);
  }, function(error) {
    response.error("Error while trying to send push " + error.message);
  });