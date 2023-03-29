
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const csv = require('fast-csv')
app.use(express.json())

app.use(cors())





app.get('/', (req, res) => {

    try {
        
        const data = []
        fs.createReadStream('./assets/AAPL.csv')

            .pipe(csv.parse({ headers: true }))

            .on('error', error => {
                throw new Error(error)
            })
            .on('data', row => data.push(row))

            .on('end', () => {
                res.status(200).json(data)
            });
            
    } catch (error) {
       
          res.status(500).json(error)
    }
    



})


app.listen(5000, console.log("server started"))




