// 💻💻 WORKING WITH HTTP MODULE TO CREATE A SERVER A SERVE FILES AND HANDLE ROUTES





// const fs = require("fs")
// const fspromises = require("fs").promises
// const path = require ("path")
// const http = require("http")

// const logEvent = require("./logEvents")

// // const EventEmitter = require ("events")
// // 
// // class Emitter extends EventEmitter {};

// //initialize object we want to create
// // const myEmitter = new Emitter()
// const PORT = process.env.port  || 3500;

// const serveFile = async (filePath, contentType, response) => {
//     try {
//     const rawData = await fspromises.readFile(filePath, "utf8")
//     const data = contentType === "application/json" ? JSON.parse(rawData) : rawData 
//     response.writeHead(200, {"Content-Type": contentType})
//     response.end(
//         contentType === "application/json" ? JSON.stringify(data) : data
//     )
//     }catch(err){
//       console.log(err)
//       response.statusCode = 500
//       response.end()
//     }
     

// }
// const server = http.createServer((req,res)=>{
//     console.log(req.url, req.method)
   

//     // let path;
//     // if (req.url === "/" || req.url === "index.html"){
//         // res.statusCode = 200
//         // res.setHeader ("Content-Type","text/html")
//         // path = path.join(__dirname, "views", "index.html")
//         // fs.readFile(path, "utf8", (err,data)=>{
//             // res.end(data)
//         // })
//     // }

//     const extension = path.extname (req.url)
//     // console.log(extension)

//     let contentType;
    
//     switch (extension){
//        case ".css":
//         contentType = "text/css"
//         break;

//          case ".js":
//         contentType = "text/javascript"
//        break;

//         case ".json":
//       contentType = "application/json"
//     break;

//     case ".jpg":
//      contentType = "image/jpeg"
//        break;
//     case ".png":
//      contentType = "image/png"
//       break;

//      case ".txt":
//      contentType = "text/plain"
//         break;
//     default:
//     contentType = "text/html"
//     }
    

//     let filePath = 
//     contentType === "text/html"  && req.url === "/"
//     ? path.join(__dirname, "views", "index.html")
//     : contentType === "text/html"  && req.url.slice(-1) === "/"
//     ? path.join(__dirname, "views", req.url,"index.html")
//     : contentType === "text/html"
//         ? path.join(__dirname, "views", req.url)
//         : path.join(__dirname, req.url); 

//     if (!extension && req.url.slice(-1) !== "/") filePath += ".html"

//     const fileExists = fs.existsSync(filePath)

//     if (fileExists){
//         serveFile(filePath, contentType, res)
//     }
//     else {
// switch (path.parse(filePath).base){
//     case "old-page.html":
//         res.writeHead(301, {"Location": "/new-page.html"})
//         res.end()
//         break;
//     case "www-page.html":
//         res.writeHead(301, {"Location": "/"})
//         res.end()
//         break;

//     default:
//         serveFile(path.join(__dirname, "views", "404.html"), "text/html", res)
// }
//     }
        
    
// })



// server.listen (PORT, ()=> console.log(`server is running ${PORT}`))



// // myEmitter.on("log", (msg)=> logEvent(msg));
// // 
// // setTimeout(()=>{
//     // myEmitter.emit("log", "log event emitted")
// // },3000)

