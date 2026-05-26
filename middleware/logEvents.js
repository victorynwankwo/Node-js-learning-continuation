

const {format } = require('date-fns');
const {v4: uuid} = require("uuid")
const fs = require("fs")
const fspromises = require("fs").promises
const path = require ("path")


 const logEvents = async (message, logName) =>{
    try{
        const date = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
          const logItem = `${date}\t${uuid()}\t${message}\n`
         console.log(logItem)

        if(!fs.existsSync(path.join(__dirname, "..", "logs"))){
            await fspromises.mkdir(path.join(__dirname, "..","logs"))
        }
        
      await fspromises.appendFile(path.join(__dirname,".." ,"logs", logName), logItem)
    }catch(err){
     console.log(err)
    }
}

const logger = async (req, res, next) => { 
    const requestOrigin = req.headers.origin || 'no-origin-detected'; 
    
    // We await this so Node finishes writing the log entry before moving on
    await logEvents(`${req.method}\t${requestOrigin}\t${req.url}`, "reqLog.txt"); 
    
    console.log(`${req.method} ${req.path}`); 
    next(); 
}

module.exports = { logEvents, logger };

// console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

// console.log("helloo")
// console.log(uuid())

module.exports = {logEvents, logger};