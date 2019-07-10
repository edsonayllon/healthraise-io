import React, { useState, useEffect } from 'react';
import '../App.css';
import ProfileTile from '../components/ProfileTile';
import { Link } from "react-router-dom";

function App() {
  const [ethereum, setEthereum] = useState({});
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    console.log(ethereum);
    ethereum.enable();
    var newAddress = await ethereum.selectedAddress;
    console.log(newAddress);
    setAddress(newAddress);
    console.log(address);
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
          <a href="#" className="button" onClick={handleLogin}>Login with Metamask</a>
        </div>
      </div>
      <div className="content">
        <ProfileTile name={"user1"}
          description = { `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.` }
          goal="3"
          raised='20'
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
