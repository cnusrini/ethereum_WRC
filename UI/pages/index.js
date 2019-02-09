import React , {Component} from 'react';
import web3 from '../hub/web3';
import contractInstance from '../hub/contract';

class allOrgUsage extends Component{

    state = {
      myaccnt:[]
    };

  static async getInitialProps(props){
    const accounts = await web3.eth.getAccounts();

    return{accounts};
  }

  render(){
console.log('third account is', this.props.accounts)
    return (
      <div>You are in indexjjj</div>
    );
  }
}

export default allOrgUsage;
