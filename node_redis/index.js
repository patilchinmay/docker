var redis = require('redis');
var client = redis.createClient(6379, 'redis')

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', function (error, result) {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('GET result ->' + result);
// });

client.sadd('user_ids', '101', redis.print);
client.sadd('user_ids', '102', redis.print);
client.sadd('user_ids', '103', redis.print);
client.sadd('user_ids', '103', redis.print);
