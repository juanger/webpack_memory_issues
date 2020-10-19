import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


(async function () {

  let rootEl = document.getElementById("root");
  if (!rootEl) {
    rootEl = document.createElement("div");
    rootEl.setAttribute("id", "root");
    document.body.appendChild(rootEl);
  }

  ReactDOM.render(<App/>,rootEl);

})()