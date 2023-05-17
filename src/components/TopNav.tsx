import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
  import useDarkMode from '../hooks/useDarkMode';
  
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

  const TopNav = () => {
    return (
      <div className='top-navigation'>
        <HashtagIcon />
        <Title />
        <ThemeIcon />
        <Search />
        <BellIcon />
        <UserCircle />
      </div>
    );
  };
  
  const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='top-navigation-icon' />
        ) : (
          <FaMoon size='24' className='top-navigation-icon' />
        )}
      </span>
    );
  };
  
  // const UserCircle = () => {
  //   const [modalIsOpen, setIsOpen] = useState(false);
  //   const openModal = () => setIsOpen(true);
  //   const closeModal = () => setIsOpen(false);
  
  //   return (
  //     <div>
  //       <FaUserCircle
  //         size='24'
  //         className='top-navigation-icon'
  //         onClick={openModal}
  //       />
  //       <Modal
  //         isOpen={modalIsOpen}
  //         onRequestClose={closeModal}
  //         contentLabel="User Options Modal"
  //       >
  //         <h2>User Options</h2>
  //         <button onClick={closeModal}>Close</button>
  //         <button onClick={() => { /* handle logout here */ }}>Logout</button>
  //       </Modal>
  //     </div>
  //   );
  // };

  const Search = () => (
    <div className='search'>
      <input className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className='text-secondary my-auto' />
    </div>
  );
  const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
  const UserCircle = () => <FaUserCircle size='24' className='top-navigation-icon' />;
  const HashtagIcon = () => <FaHashtag size='20' className='title-hashtag' />;
  const Title = () => <h5 className='title-text'>tailwind-css</h5>;
  
  export default TopNav;
  