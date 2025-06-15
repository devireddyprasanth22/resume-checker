import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import './App.css'
import AnimatedRoutes from './components/animatedRoutes';
import axios from "axios";
import Button from "@mui/material/Button";

function App() {
  return (
    <AnimatedRoutes />
  );
}

export default App;
