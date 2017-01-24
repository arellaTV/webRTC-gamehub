var peer = new Peer({
  host: 'localhost',
  port: 9000,
  path: '/peerjs'
});

console.log(peer);

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});
