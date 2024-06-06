import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};
//alert.show/error/success("message")
//alert=useAlert()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ReduxProvider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
        </AlertProvider>
  </ReduxProvider>
 </BrowserRouter> ,
  </React.StrictMode>
  
)
