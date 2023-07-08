const config = require('./config.js');
const cmnController = require("./commoncontroller");

// to call the dependancy function
(() => {
    try {
        // API 
        if (config.API === 'ON') {
            // route api call
            cmnController.appStarted('./routes/index.js', config.Api_EndPoint, "Sample");
        };
    } catch (err) {
        console.log(err);
    }
})();