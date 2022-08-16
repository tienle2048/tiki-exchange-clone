import './App.css';
import "react-resizable/css/styles.css";
import 'antd/dist/antd.min.css'
import 'react-toastify/dist/ReactToastify.css';

import {Login,Home ,DetailOrderBook} from './page'

import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom";


function App() {
  const islogin = useSelector(state => state.authen.isLogin)
  const token = useSelector(state => state.authen.user)
  console.log(islogin, token)
  if (!islogin) return <Login />

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailOrder" element={<DetailOrderBook />} />
      </Routes>
    </div>
  );
}
export default App;
