const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/dataAPI.json');
const CONTRACT_ABI = require('./config');
const CONTRACT_ADDRESS = require('./config');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    // next();
});

var provider = new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(CONTRACT_ABI.CONTRACT_ABI, process.env.CONTRACT_ADDRESS);

const postCID = async (user, cid, fileName) => {
    const res = await myContract.methods.addCID(user,cid,fileName).send({
        from: process.env.ACCOUNT
    });
    return res;
};
const getCID = async (user) => {
    const data = await myContract.methods.get(user).call();
    var res = [];
    for (let i = 0; i < data.length; i++) {
        res.push({ 'cid': data[i]['cid'], 'fileName': data[i]['fileName'] });
    }
    return { 'files': res };
}
app.post("/postCID", async (req, res) => {
    const cid = req.body.cid;
    const fileName = req.body.fileName;
    const user = req.body.userId;
    console.log(cid, user, fileName);
    await postCID(user, cid, fileName).then((result) => {
        res.status(201).send({
            message: "Date Saved Suceessfully",
            info: result,
        });
    })
        .catch((error) => {
            res.status(500).send({
                message: "Error Saving Date",
                error,
            });
        });;
})

app.get("/getCID", async (req, res) => {
    const user = req.query.userId;
    await getCID(user).then((result) => {
        res.json(result);
    }).catch(
        (err)=>{
            // console.log(user);
            console.log(err);
        }
    );
});


module.exports = app;
