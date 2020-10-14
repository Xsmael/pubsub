/**
 * FIXME: IMPORTANT NOTICE!    THIS THING IS FACING THE INTERNET YOU GOTTA SECURE IT PROPERLY ASAP!
 * check this for securing the server: https://faye.jcoglan.com/security/authentication.html
 */


var http = require('http'),
    faye = require('faye');
var log = require("noogger");
const PORT= 8888;
var server = http.createServer(),
    bayeux = new faye.NodeAdapter({
        mount: '/pubsub'
    });
    
log.init({outputPath:"SERVERS_LOGS/pubsub/"});

bayeux.on('handshake', function (clientId) { // handshake [clientId] – Triggered when a new client connects and is issued with an ID.
    log.notice("[HANDSHAKE:] New client, id:" + clientId);
});
bayeux.on('disconnect', function (clientId,) {  // disconnect [clientId] – Triggered when a client session ends, either because it explicitly sent a /meta/disconnect message or because its session was timed out by the server.
    log.warning("[DISCONNECT:]  clien disconnected, id: " + clientId);
});
bayeux.on('subscribe', function (clientId, channel) { // subscribe [clientId, channel] – Triggered when a client subscribes to a channel. This does not fire if a /meta/subscribe message is received for a subscription that already exists.
    log.notice(clientId + " subscribed on channel " + channel);
});
bayeux.on('unsubscribe', function (clientId, channel) {// unsubscribe [clientId, channel] – Triggered when a client unsubscribes from a channel. This can fire either because the client explicitly sent a /meta/unsubscribe message, or because its session was timed out by the server.
    log.warning(clientId + " unsubscribed on channel " + channel);
});
bayeux.on('publish', function (clientId, channel, data) { // publish [clientId, channel, data] – Triggered when a non-/meta/** message is published. Includes the client ID of the publisher (which may be null), the channel the message was sent to and the data payload.
    log.debug(clientId + " publish on channel " + channel);
});


bayeux.attach(server);
server.listen(PORT);

log.notice("Server started on port "+PORT);






