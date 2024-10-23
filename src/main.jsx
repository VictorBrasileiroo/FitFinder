import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './features/header/NavBar'
import FormsTreino from './features/main/FormsTreino'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar/>
    <FormsTreino/>
  </StrictMode>,
)
