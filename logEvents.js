// console.log("testingg!...")//

const {format } = require('date-fns');
const {v4: uuid} = require("uuid")
const fs = require("fs")
const fspromises = require("fs").promises
const path = require ("path")


 const logEvents = async (message) =>{
    try{
        const date = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
          const logItem = `${date}\t${uuid()}\t${message}\n`
         console.log(logItem)
        if(!fs.existsSync(path.join(__dirname, "logs"))){
            await fspromises.mkdir(path.join(__dirname, "logs"))
        }
        //testing
      await fspromises.appendFile(path.join(__dirname, "logs", "eventlog.txt"), logItem)
    }catch(err){
     console.log(err)
    }
}

// console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

// console.log("helloo")
// console.log(uuid())

module.exports = logEvents;