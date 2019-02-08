import React,{Component} from 'react';
import web3 from '../../hub/web3';
import contractInstance from '../../hub/contract';

class allOrgUsage extends Component{

  static async getInitialProps(){
    const accounts = await web3.eth.getAccounts();

    return{accounts};
  }

  render(){
    console.log('third account is', accounts[3])
    return (
      <div>You are in index</div>
    );
  }
}

export default allOrgUsage;
