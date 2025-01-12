import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Logo } from '@pmndrs/branding'
import VerticalMenu from "./VerticalMenu";
import Example from './ExampleHeader';
import Underlay from './Underlayer';
import StartMenu from './components/StartMenu';

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Underlay />
  </>
)
