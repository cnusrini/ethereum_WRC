import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
{
  //We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
}
else{
  //User is not on the browser (othwerise user is on the server)
  //User is not having metamask
  //const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
  web3 = new Web3(provider);

}

export default web3;
