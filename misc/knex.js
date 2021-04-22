//LOCAL SERVER

// const diagrams = require('knex')({
//     client: 'mysql',
//     version: '8.0.23',
//     connection: {
//         host: '127.0.0.1',
//         user: process.env.CONNECTION_USER,
//         password: process.env.CONNECTION_PASS,
//         database: 'diagrams'
//     }
// })

const diagrams = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
        host: 'freedb.tech',
        user: process.env.CONNECTION_USER,
        password: process.env.CONNECTION_PASS,
        database: 'freedbtech_diagrams'
    }
})

export default diagrams;


