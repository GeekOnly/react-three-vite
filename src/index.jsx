import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Underlay from './Underlayer';
import AboutMe from './AboutMe';
import Projects from './Projects';
import BlogList from "./components/BlogList";
import BookmarkList from './components/Bookmark';

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
    <Underlay />
    <h1 className="text-9xl font-bold">About Me</h1>
    <AboutMe />
    <h1 className="text-9xl font-bold">POST</h1>
    <BlogList />
    <h1 className="text-9xl font-bold">BOOKMARKS</h1>
    <BookmarkList />
  </>
)
