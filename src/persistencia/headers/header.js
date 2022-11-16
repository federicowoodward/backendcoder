import express from "express";

const server = express();


export default function headersConfiguration() {
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000/'); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Credentials', 'false');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
}
