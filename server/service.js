var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Demandtst Service',
  description: 'create service to perminatly run express server for demandmap application',
  script: 'C:\\inetpub\\wwwroot\\demandtstapi\\src\\server.mjs'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();