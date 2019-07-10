import React, { useState, useEffect } from 'react';
import '../App.css';
import {
  ProfileTile,
  SettingsButton
} from '../components';
import { Link } from "react-router-dom";
import config from '../config';

function App() {
  const [ethereum, setEthereum] = useState({});
  const [address, setAddress] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = async () => {
    ethereum.enable();
    var newAddress = await ethereum.selectedAddress;
    setAddress(newAddress);
    const res = await fetch(`${config.API_ADDR}/api/users?address=${newAddress}`, {
      method: 'GET'
    });
    const users = await res.json();
    console.log(users);
    if (users === {}) {
      signUp(newAddress);
    } else {
      setName(users.name);
      setAuthenticated(true);
    }
  }

  const signUp = async (address) => {
    console.log('ran');
    const res = await fetch(`${config.API_ADDR}/api/users`, {
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const json = await res.json();
  }

  useEffect(()=>{
    const ethereum = window.ethereum;
    setEthereum(ethereum);
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
            authenticated ? <SettingsButton name={name} />
            : <a href="#" className="button" onClick={handleLogin}>Login with Metamask</a>
          }
        </div>
      </div>
      <div className="content">
        <ProfileTile name={"Penn State Children’s Hospital"}
          description = { `The money raised allows us to use novel
            approaches in laboratory based research to
            understand mechanisms that cause
            pediatric cancer and to find pathways that
            can be targeted with new drugs. It provides
            the infrastructure for early phase clinical
            &ials to test how new drugs work and
            identify the best ways to use them together
            and with chemotherapy.
            ` }
          goal="na"
          raised='15,892.69'
        />
        <ProfileTile name="user2"
          description = { `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s.` }
          goal="20"
          raised='20'
        />
        <ProfileTile name="user4"
          description = { `Contrary to popular belief, Lorem Ipsum is not simply random text.
          It has roots in a piece of classical Latin literature from 45 BC, making it
          over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur` }
          goal="10"
          raised='40'
        />
        <ProfileTile name="user7" description = { `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s.` }
          goal="7"
          raised='50'
        />
      </div>
    </div>
  );
}

export default App;
