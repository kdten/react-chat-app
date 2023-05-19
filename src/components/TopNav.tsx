import React, { useState, useContext, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import Modal from 'react-modal';
import SelectedTopicContext from '../contexts/SelectedTopicContext';
import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';  
import { User } from "firebase/auth";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

  const TopNav = () => {
    const { selectedTopic } = useContext(SelectedTopicContext);

    return (
      <div className='top-navigation'>
        <HashtagIcon />
        <Title selectedTopic={selectedTopic} />
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
  
  const UserCircle = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [darkTheme] = useDarkMode();
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const customStyles = {
      overlay: {
        backgroundColor: 'transparent',
      },
      content: {
        top: '3.8rem', // values for placement
        left: '84%',
        right: '0%',
        bottom: 'auto',
        width: '16%', // values for size
        height: '11%',
        backgroundColor: 'rgb(54 57 63)',
        // backgroundColor: 'rgb(227 229 232)'
      },
    };
  
    return (
      <div>
        <FaUserCircle
          size='24'
          className='top-navigation-icon'
          onClick={openModal}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Options Modal"
          style={customStyles} // apply the custom styles here
        >
          <h2>Header</h2>
          {/* <button onClick={closeModal}>Close</button> */}
          <button onClick={() => { <SignOut /> }}>Logout</button>
        </Modal>
      </div>
    );
  };

  function SignOut() {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    return user && (
        <button className="signout-button" onClick={() => signOut(auth)}>Sign Out</button>
    )
  }

  const Search = () => (
    <div className='search'>
      <input className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className='text-secondary my-auto' />
    </div>
  );
  const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
  // const UserCircle = () => <FaUserCircle size='24' className='top-navigation-icon' />;
  const HashtagIcon = () => <FaHashtag size='20' className='title-hashtag' />;
  const Title = ({selectedTopic}) => <h5 className='title-text'>{selectedTopic?.name}</h5>;

  
  export default TopNav;
  