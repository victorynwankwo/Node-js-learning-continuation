const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS security policy!"));
    }
  },
  optionsSuccessStatus: 200,
};


// Apply the restricted CORS settings to your app
module.exports = corsOptions;