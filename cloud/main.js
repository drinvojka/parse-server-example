Parse.Cloud.beforeSave('Match', function(request, response) {

    if(!request.object.isNew()) {
        // Retrieve the relationship information in json string format. 
        // RELATION_QUEUE here is simply a string "queue"
        var relQueueJsonStr = request.object.op("AddRelation");
		console.log("LOG " + relQueueJsonStr);
        if( relQueue !== undefined ) {
            var relQueue = JSON.parse(relQueueJsonStr);
            // Retrieve the operation being performed to this existing object.
            // The value will be "AddRelation" if a the relation "queue" is  
            // being added to this object
            var operation = relQueue.__op;
            if (operation == "AddRelation"){
                console.log("Relation queue is being added");
                console.log(request.object);
				
                response.success();
            } else {
            // Relation is being removed
                console.log("Relation queue is being removed");
                response.success();
            }
        } else {
            console.log("No queue relation.");
            response.success();
        }
    } else {
        response.success();
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
Parse.Cloud.define('requestRejected', function(request, response) {
	
	
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
  data: {"alert": hostUser + " rejected your request to join the match !" },
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
