import web3 from './web3';
//import poeContract from '../ethereum/build/contracts/WRC.json';

const address = '0x70c2Bf5A99B5C92457b97A55c6993800BAB73EA4';
const abi = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgNameEvent","type":"address"},{"indexed":false,"name":"businessTypeEvnt","type":"string"},{"indexed":false,"name":"businessSizeEvnt","type":"string"}],"name":"logAllOrgUsage","type":"event","signature":"0x89cfa01560fc3626ed43e5c71d1c28c3a2e27ec301f0172ca3ec0efaaba15633"},{"constant":false,"inputs":[{"name":"_businessType","type":"string"},{"name":"_businessSize","type":"string"},{"name":"_maxAllowableWaterUsage","type":"uint256"},{"name":"_recycleable","type":"uint256"},{"name":"_moreThanRecycleable","type":"uint256"}],"name":"registerNewOrg","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xcccc84af"},{"constant":true,"inputs":[{"name":"_orgAddress","type":"address"}],"name":"getPerOrgUsage","outputs":[{"name":"RetorgAddress","type":"address"},{"name":"RetbusinessType","type":"string"},{"name":"RetbusinessSize","type":"string"},{"name":"RetmaxAllowableWaterUsage","type":"uint256"},{"name":"Retrecycleable","type":"uint256"},{"name":"RetmoreThanRecycleable","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x464dfe0c"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x41c0e1b5"}]';

const instance = new web3.eth.Contract(JSON.parse(abi), address);


export default instance;
