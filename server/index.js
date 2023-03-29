
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const csv = require('fast-csv')
const data = []
app.use(express.json())

app.use(cors())

fs.createReadStream('./assets/AAPL.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => data.push(row))
  .on('end', () => console.log(data));
 

app.get('/details',async(req,res)=>{
      
    try {

        const details = await data
        res.status(200).json(data)
        
    } catch (error) {
         
        res.status(500).json(error)
    }
    
    
})


app.listen(5000,console.log("server started"))




