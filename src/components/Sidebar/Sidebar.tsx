// import Top from './Top';
import Playlist from './Playlist';

const Sidebar = () => {
  return (
    <div className="hidden h-[calc(100vh-12ch)] max-h-[calc(100vh-12ch)] w-[18.5%] space-y-2 overscroll-y-auto md:block">
      <Playlist />
    </div>
  );
};

export default Sidebar;
