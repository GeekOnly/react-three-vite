import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Underlay from './Underlayer';
import AboutMe from './AboutMe';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Underlay />
    <AboutMe />
  </>
)
