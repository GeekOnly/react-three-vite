import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Underlay from './Underlayer';
import AboutMe from './AboutMe';
import Projects from './Projects';
import BlogList from "./components/BlogList";
import BookmarkList from './components/Bookmark';
import TicTacToe from './components/TicTacToe';
import Footer from './components/Footer';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog</h1>
      </div>
    </header>
  );
};

createRoot(document.getElementById('root')).render(
  <>
    <App/>
    <Underlay />
    <h1 className="text-9xl font-bold">About Me</h1>
    <AboutMe />
    <h1 className="text-9xl font-bold">Projects</h1>
    <Projects />
    <h1 className="text-9xl font-bold">POST</h1>
    <BlogList />
    <h1 className="text-9xl font-bold">BOOKMARKS</h1>
    <BookmarkList />
    <h1 className="text-9xl font-bold">GAME</h1>
    <TicTacToe />
    <Footer />
  </>
)
