const express = require('express');

const app = express()

const PORT = 3000
const ADDRESS = 'localhost';

app.listen(PORT,ADDRESS, () => {
    console.log(`Server listening on http://${ADDRESS}:${PORT}`)
})