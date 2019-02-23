import React , {Component} from 'react';
import Link from 'next/link'
import {Button,Card,Container,Divider,Icon,Menu,Segment,Table} from 'semantic-ui-react'
import web3 from '.././hub/web3'
import contractInstance from '.././hub/contract'
import Layout from '../components/Layout'
import axios from 'axios'

class allOrgUsage extends Component{
  state={
      infoTemperature:'',
      data:[]
}
   //infoHumidity,infoCup,infoBrewing,infoMaintenance}

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

  stopStreaming = async (event) => {
    console.log('in stopStreaming');
  event.preventDefault();
  try {

  } catch (e) {
    console.log('in catch:', e.Message);
  }

}
  startStreaming = async (event) => {
  console.log('in startStreaming');
  event.preventDefault();

  axios.get('http://localhost:8080/')
    .then(res => {
      const item = {
	       infoTemperature: res.data.infoTemperature,
	        infoHumidity: res.data.infoHumidity,
	         infoCup: res.data.infoCup,
	          infoBrewing: res.data.infoBrewing,
	           infoMaintenance: res.data.infoMaintenance
}

let newdata = this.state.data
newdata.push(item)
this.setState({data:newdata})


      console.log('data', this.state.data);

    })

try {
  console.log('in try');
  await status();
} catch (e) {
  console.log('in catch:', e.Message);
}

}

  render(){
    console.log('tx', this.props.tx);
    console.log('ver', web3.version);
    const { Body,Cell,Footer,Header,HeaderCell, Row} = Table
    return (
      <Layout>
      <Segment>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
            <p>This is an IoT simulator</p>
              <Button.Group color='blue' floated='right'>
                <Button onClick={this.stopStreaming}>Stop Streaming</Button>
                <Button onClick={this.startStreaming}>Start Streaming</Button>

              </Button.Group>
              <Divider />
              <Table celled>
                <Header>
                  <Row>
                    <HeaderCell>Temperature</HeaderCell>
                    <HeaderCell>Humidity</HeaderCell>
                    <HeaderCell>Cup</HeaderCell>
                    <HeaderCell>Brewing</HeaderCell>
                    <HeaderCell>Maintenance</HeaderCell>
                  </Row>
                </Header>
                <Body>
                {this.state.data.map((item) =>{
                  return (
                  <Row>

                    <Cell>{item.infoTemperature}</Cell>
                    <Cell>{item.infoHumidity}</Cell>
                    <Cell>{item.infoCup}</Cell>
                    <Cell>{item.infoBrewing}</Cell>
                    <Cell>{item.infoMaintenance}</Cell>
                  </Row>
              )})}


                </Body>
                <Footer>

                  <Row>
                    <HeaderCell colSpan='5'>
                      <Menu floated='right' pagination>
                      <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                      </Menu.Item>
                      <Menu.Item as='a'>1</Menu.Item>
                      <Menu.Item as='a'>2</Menu.Item>
                      <Menu.Item as='a'>3</Menu.Item>
                      <Menu.Item as='a'>4</Menu.Item>
                      <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                      </Menu.Item>
                      </Menu>
                    </HeaderCell>
                  </Row>

                </Footer>
              </Table>
            <Link href="/about">
              <a style={{ fontSize: 20 }}>About Page</a>
            </Link>
      </Segment>
      </Layout>
    );
  }
}

export default allOrgUsage;
