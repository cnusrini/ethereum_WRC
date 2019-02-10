import React , {Component} from 'react';
import Link from 'next/link'
import {Card} from 'semantic-ui-react'
import web3 from '.././hub/web3'
import contractInstance from '.././hub/contract'
import Layout from '../components/Layout'

class allOrgUsage extends Component{

  static async getInitialProps(props){
    let accounts = 0;
    let alice = 0;
    let tx = 0;
    let allLogs = null;

    try {

      accounts = await web3.eth.getAccounts();
      alice = await accounts[2];
      tx = await contractInstance.methods.registerNewOrg("a","b",1,2,3).send({
        from:alice,
        gas:10000000
      });
      allLogs = await contractInstance.getPastEvents('logRegOrg', {fromBlock:0,toBlock:'latest'})

    } catch (e) {
      console.log(e.message);
    }

/*
    const events= await contractInstance.getPastEvents('logRegOrg',{
        fromBlock: (await web3.eth.getBlockNumber()) - 12343,
        toBlock: (await web3.eth.getBlockNumber()) - 6172
    });
    */

    return {accounts,alice,allLogs,tx} ;
  }

  //Method to render
  /*
  businessSizeEvnt1: "b"
businessTypeEvnt1: "a"
maxAllowableWaterUsageEvnt1: "1"
moreThanRecycleableEvnt1: "3"
orgNameEvent1: "0xceF1FBd5D9150067919043a888896E8c2797FD1D"
recycleableEvnt1: "2"
  */
  
  render(){
    console.log('add', this.props.alice);
    console.log('tx', this.props.tx);
    console.log('logs', this.props.allLogs);

    return (
      <Layout>
        <p>You are in index pageeee</p>
        <Link href="/about">
          <a style={{ fontSize: 20 }}>About Page</a>
        </Link>
      </Layout>
    );
  }
}

export default allOrgUsage;
