const http = require("http");

var redis = require('redis');

var client = redis.createClient(6379, 'redis');

client.on('connect', function() {
    console.log('Redis client connected');

    client.sadd("user_ids", "demo@demo.com", (err, result)=>{
        if(result){
            console.log("Initialized user_ids with demo@demo.com");
        }
    });

});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

exports.get_all_users = (req, res) => {
    client.smembers("user_ids", function(err, result){
        if(result){
            console.log(result);

            return res.status(200).json({
                "user_ids": result
            });
        }else if (err){
            console.log(err);

            return res.status(500).json({
                "error": err
            });
        }
        
    });
    
}

exports.add_user = (req, res) => {
    let id = String(req.params.id);

    console.log(`id = ${id}`);

    client.sadd("user_ids", id, function(err, result){

        if(result == 1){

            console.log(`result = ${result}`);

            return res.status(200).json({
                "result": result,
                "duplicate": false
            });

        } else if(result == 0){

            console.log(`result = ${result}`);

            return res.status(500).json({
                "result": result,
                "duplicate": true
            });

        } else if (err){

            console.log(err);

            return res.status(500).json({
                "error": err
            });

        }
        
    });
    
}
