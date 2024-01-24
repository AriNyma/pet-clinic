import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Doctor from './Pages/Doctor';
import Owner from './Pages/Owner';
import Login from './Pages/Login';
import Layout from './Components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/owner" element={<Owner />} />
      </Routes>
    </Layout>
  );
}

export default App;
