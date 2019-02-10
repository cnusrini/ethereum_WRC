import web3 from './web3';
//import poeContract from '../ethereum/build/contracts/WRC.json';

const address = '0x70c2Bf5A99B5C92457b97A55c6993800BAB73EA4';

const abi = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgNameEvent","type":"address"},{"indexed":false,"name":"businessTypeEvnt","type":"string"},{"indexed":false,"name":"businessSizeEvnt","type":"string"},{"indexed":false,"name":"maxAllowableWaterUsageEvnt","type":"uint256"},{"indexed":false,"name":"recycleableEvnt","type":"uint256"},{"indexed":false,"name":"moreThanRecycleableEvnt","type":"uint256"}],"name":"logPerOrgUsage","type":"event","signature":"0x98b0887d38ec960ba33f81ed31540190f3e381446b1ee76aa116336ef2711f28"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgNameEvent1","type":"address"},{"indexed":false,"name":"businessTypeEvnt1","type":"string"},{"indexed":false,"name":"businessSizeEvnt1","type":"string"},{"indexed":false,"name":"maxAllowableWaterUsageEvnt1","type":"uint256"},{"indexed":false,"name":"recycleableEvnt1","type":"uint256"},{"indexed":false,"name":"moreThanRecycleableEvnt1","type":"uint256"}],"name":"logRegOrg","type":"event","signature":"0x1552f9097c60351010dea226cef1fbd5d9150067919043a888896e8c2797fd1d"},{"constant":false,"inputs":[{"name":"_businessType","type":"string"},{"name":"_businessSize","type":"string"},{"name":"_maxAllowableWaterUsage","type":"uint256"},{"name":"_recycleable","type":"uint256"},{"name":"_moreThanRecycleable","type":"uint256"}],"name":"registerNewOrg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xcccc84af"},{"constant":false,"inputs":[{"name":"_orgAddress","type":"address"}],"name":"getPerOrgUsage","outputs":[{"name":"RetorgAddress","type":"address"},{"name":"RetbusinessType","type":"string"},{"name":"RetbusinessSize","type":"string"},{"name":"RetmaxAllowableWaterUsage","type":"uint256"},{"name":"Retrecycleable","type":"uint256"},{"name":"RetmoreThanRecycleable","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x464dfe0c"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x41c0e1b5"}]';


const instance = new web3.eth.Contract(JSON.parse(abi), address);

export default instance;
