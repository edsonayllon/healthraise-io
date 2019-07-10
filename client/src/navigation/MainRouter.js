import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
import {
  Home,
  Profile
} from '../screens';

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/u/:user" component={Profile} />
        <Route path="/users/" component={Profile} />
      </div>
    </Router>
  );
}

