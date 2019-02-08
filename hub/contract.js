import web3 from './web3';
import poeContract from '../ethereum/build/contracts/WRC.json';

const address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
const abi = '[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proofs","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"checkDocument","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"document","type":"string"}],"name":"notarize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"proof","type":"bytes32"}],"name":"storeProof","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"proof","type":"bytes32"}],"name":"hasProof","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"proofFor","outputs":[{"name":"proof","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"}]';

const instance = new web3.eth.Contract(JSON.parse(abi), address);


export default instance;
