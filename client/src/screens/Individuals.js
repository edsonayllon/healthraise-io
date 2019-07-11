import React, { useState, useEffect } from 'react';
import '../App.css';
import {
  ProfileTile,
  SettingsButton
} from '../components';
import { Link } from "react-router-dom";
import config from '../config';
import Web3 from 'web3';

// sources:
// https://www.insidephilanthropy.com/health-philanthropy/medical-research.html
// https://thon.org/research-spotlight/

function App() {
  const [ethereum, setEthereum] = useState({});
  const [address, setAddress] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [web3, setWeb3] = useState({});

  const handleLogin = async () => {
    if (!ethereum.selectedAddress || !window.web3.eth.accounts[0]) {
      try {
        // Request account access if needed
        const result = await ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        setWeb3(new Web3(ethereum));
      } catch (error) {
        window.alert('MetaMask authentication required.');
        return;
      }
    }

    var newAddress = await ethereum.selectedAddress;
    setAddress(newAddress);
    const res = await fetch(`${config.API_ADDR}/api/users?address=${newAddress}`, {
      method: 'GET'
    });
    var users = await res.json();
    if (users.name) {
      setName(users.name);
      setAuthenticated(true);
    } else {
      var users = signUp(newAddress);
    }

    const payload = await handleSignatureStamp(users.address, users.nonce);
    const result = await authenticate(payload);
  }

  const handleSignatureStamp = async (address, nonce) => {
    return new Promise(function(resolve, reject) {
      try {
        //const signature = eth.personal_sign(fromAddress, hexEncodedUtf8Message)
        const signature = window.web3.personal.sign(
          `I'm signing a one-time login with stamp: ${nonce}`,
          address,
          function (err, result) {
            if (err) return console.error(err)
            console.log('PERSONAL SIGNED:' + result);
            resolve({ address, signature: result });
          }
        );
      } catch (err) {
        console.log(err);
        throw new Error('You need to sign the message to be able to log in.');
      }
    })
  }

  const signUp = async (address) => {
    console.log('ran');
    const res = await fetch(`${config.API_ADDR}/api/users`, {
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const json = await res.json();
    setName(address);
    setAuthenticated(true);
    return json;
  }

  const authenticate = async (payload) => {
    const res = await fetch(`${config.API_ADDR}/api/auth`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const json = await res.json();
    return json;
  }

  useEffect(()=>{
    const ethereum = window.ethereum;
    setEthereum(ethereum);
    setWeb3(new Web3(ethereum));
  },[])

  return (
    <div className="container">
      <div className="nav">
        <div className="nav-menu">
          <h1>Healthraise</h1>
          <ul>
           <li><Link to="/">Organizations</Link></li>
           <li><Link to="/">People</Link></li>
          </ul>
        </div>

        <div className="nav-user">
          {
            authenticated || ethereum.selectedAddress ? <Link to="/settings"><SettingsButton name={ethereum.selectedAddress} /></Link>
            : <a href="#" className="button" onClick={handleLogin}>Login with Metamask</a>
          }
        </div>
      </div>
      <div className="content">
        <ProfileTile name={"Louis Simpson"}
          description = { `Louis Simpson and his wife Kimberly Querrey recently gave $92 million to support a new 12-story research hub at Northwestern which will provide space for research into neurodegenerative disorders, as well as cancer, heart disease and genetics.
            ` }
          goal="na"
          upvote="512"
          downvote="0"
          raised='0'
        />
        <ProfileTile name="Mark and Mary Stevens Neuroimaging and Informatics Institute"
          description = { `The research hub aims to foster the "translation of
          basic research into new therapies, preventions and cures for brain
          injury and disease, including Alzheimer’s, schizophrenia and traumatic
          brain injury."` }
          goal="20"
          raised='175,722.20'
          upvote="34512"
          downvote="23"
        />
        <ProfileTile name="University of Iowa"
          description = { `Glaucoma and pediatric cancer research programs. ` }
          goal="10"
          raised='31,630.00'
          upvote="4512"
          downvote="21"
        />
        <ProfileTile name="West Virginia University" description = { `Juvenile diabetes research program.` }
          goal="7"
          raised='3514.44'
          upvote="512"
          downvote="15"
        />
      </div>
    </div>
  );
}

export default App;
