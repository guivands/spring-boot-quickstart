var http = require('http');
var app = require('./config/express');

var cors = require('cors');
app.use(cors());

http.createServer(app)
.listen(process.env.PORT || 3030, function() {
	console.log('Servidor iniciado 3030');
});

 

//var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//  var addr = server.address();
//  logger.info("Servidor iniciado em", addr.address + ":" + addr.port);
//});