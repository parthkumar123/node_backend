const config = require('./config.js');
const server = require("./server");

// to call the dependancy function
(() => {
    try {
        // API 
        if (config.API === 'ON') {
            // route api call
            server.appStarted('./routes/index.js', config.Api_EndPoint, "Sample");
        };
    } catch (err) {
        console.log(err);
    }
})();