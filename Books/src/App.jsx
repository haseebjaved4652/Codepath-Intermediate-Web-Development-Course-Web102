import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Card from './Components/Card';
import CreatePost from './Components/CreatePost';
import PostModal from './Components/PostModal';
import UpdatePost from './Components/UpdatePost';
import img4 from './assets/img4.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img1 from './assets/img1.jpg';
import img5 from './assets/img5.jpg';

import './App.css';

function App() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [votes, setUpvotes] = useState([106, 559, 248]);
  const [selectedPost, setSelectedPost] = useState(null);
  const nowTime = new Date("2024-04-26T08:02:00");
  const nowDate = nowTime.toLocaleString();
  const [searchResults, setSearchResults] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  
  // Store Initial Vlues for Attributes
  const [cards, setCards] = useState([
    {
      imgSrc: img4,
      title: "Crime and Punishment",
      text: "The story follows Rodion Raskolnikov, a poor former student who plots to murder a pawnbroker in order to liberate himself from poverty.",
      createdAt: new Date("2024-04-26T08:02:00"),
      lastUpdated: `Last updated ${nowTime.toLocaleString()}`, 
      upvotes: 106,
      comments: []
    },
    {
      imgSrc: img2,
      title: "Plato's Republic",
      text: "The Republic by Plato is a text that describes the importance of being just in the world, and by being just, one is happ.",
      lastUpdated: `Last updated ${new Date("2024-04-26T07:00:00").toLocaleString()}`, 
      upvotes: 559,
      createdAt: new Date("2024-04-26T07:00:00"),
      comments: []
    },
    {
      imgSrc: img3,
      title: "Notes from Underground",
      text: "A nameless, deeply alienated man, living in a self-imposed 'underground' state, bitterly reflects on his isolation from society and his own self-loathing through a series of introspective, often contradictory confessions, exposing the complexities of the human psyche.",
      lastUpdated: `Last updated ${new Date("2024-04-26T09:00:00").toLocaleString()}`,
      upvotes: 248,
      createdAt: new Date("2024-04-26T09:00:00"),
      comments: []
    },
    {
      imgSrc: img1,
      title: "Thus Spoke Zarathustra",
      text: "A solitary prophet named Zarathustra, after years of seclusion in the mountains, descends to share his philosophy with humanity, advocating for the concept of the 'Übermensch' (Overman) who transcends conventional morality and embraces the will to power.",
      createdAt: new Date("2024-04-26T12:02:00"),
      lastUpdated: `Last updated ${nowTime.toLocaleString()}`, 
      upvotes: 943,
      comments: []
    },
    {
      imgSrc: img5,
      title: "Beyond Good and Evil",
      text: "In Beyond Good and Evil, Nietzsche accuses past philosophers of lacking critical sense and blindly accepting dogmatic premises in their consideration of morality.",
      createdAt: new Date("2024-03-26T12:02:00"),
      lastUpdated: `Last updated ${nowTime.toLocaleString()}`, 
      upvotes: 1342,
      comments: []
    },
  ]);

  const toggleModal = () => {
    setShowCreateModal(!showCreateModal);
  };  

  const addPost = (newPost) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    const newCard = {
        // Use an empty string if no image URL is provided
        imgSrc: newPost.imageUrl || '',
        title: newPost.title,
        text: newPost.content || '',
        lastUpdated: `Last updated ${formattedDate}`,
        upvotes: 0, // Initialize upvotes count to 0
        createdAt: now,
        comments: []
    };

    // Add the new card to the existing list
    setCards((prevCards) => [...prevCards, newCard]);
    setShowCreateModal(false);
    setShowSuccessAlert(true);
    setUpvotes((votes) => [...votes, newCard.upvotes]);

    // Automatically hide alert after 3 seconds
    setTimeout(() => {
        setShowSuccessAlert(false);
    }, 3000);
  };

  const handleCardClick = (card) => {
    setSelectedPost(card);
    setShowModal(true);
  };

  const handleUpvote = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].upvotes += 1;
    setCards(updatedCards);
  };

  const handleDelete = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    setShowModal(false); // Close modal after deletion
  };

  // Function to sort posts by created time or upvotes count
  const sortPosts = (criteria) => {
    let sortedCards = [...cards];

    if (criteria === 'createdTime') {
      sortedCards.sort((a, b) => b.createdAt - a.createdAt);
    } else if (criteria === 'upvoteCount') {
      sortedCards.sort((a, b) => b.upvotes - a.upvotes);
    }

    // Update the upvotes in the sorted array
    setUpvotes(sortedCards.map(card => card.upvotes));

    setCards(sortedCards);
  };

  // Update post
  const updatePost = (index, selectedPost) => {    
    console.log("ads ", selectedPost);
    setCards(prevCards => {
      return prevCards.map((card, i) => {
        if (i === index) {
          return { ...card, ...selectedPost, lastUpdated: `Last updated ${new Date().toLocaleString()}` };
        }
        console.log("New cards after update:", card); 
        return card;
      });
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <Navbar 
        showModal={showCreateModal} 
        toggleModal={toggleModal} 
        sortPosts={sortPosts} 
        allPosts={cards} 
        setSearchResultsProp={handleSearchResults}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="horizontal-scroll">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <Card
                    key={index}
                    imgSrc={result.imgSrc}
                    title={result.title}
                    text={result.text}
                    lastUpdated={result.lastUpdated}
                    upvotes={result.upvotes}
                    onClick={() => handleCardClick(result)}
                    onUpvote={() => handleUpvote(index)}
                    onDelete={() => handleDelete(index)}
                    onUpdate={() => {
                      setSelectedPost(result);
                      updatePost(index, result);
                    }}
                  />
                ))
              ) : (
                cards.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      imgSrc={card.imgSrc}
                      title={card.title}
                      text={card.text}
                      lastUpdated={card.lastUpdated}
                      upvotes={card.upvotes}
                      onClick={() => handleCardClick(card)}
                      onUpvote={() => handleUpvote(index)}
                      onDelete={() => handleDelete(index)}
                      onUpdate={() => {
                        setSelectedPost(card);
                        updatePost(index, card);
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Control modal visibility */}
      {showCreateModal && (
        <>
          <div className="backdrop"></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
            <CreatePost addPost={addPost} onClose={() => setShowCreateModal(false)} />
            </div>
          </div>
        </>
      )}
      {showModal && (
        <PostModal
          post={selectedPost}
          onClose={() => setShowModal(false)}
        />
      )}
      {showSuccessAlert && (
        <div className="alert alert-success success-alert d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
            <use xlinkHref="#check-circle-fill" /> 
          </svg>
          <div>
            Successfully created post!
          </div>
        </div>
      )}

      {showEditModal && (
          <>
              <div className="backdrop" onClick={() => setShowEditModal(false)}></div>
              <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                      <UpdatePost
                          post={selectedPost}
                          index={cards.findIndex(card => card === selectedPost)} 
                          updatePost={(index, updatedPost) => updatePost(index, updatedPost)}
                          onClose={() => setShowEditModal(false)}
                      />
                  </div>
              </div>
          </>
      )}
    </div>
  );
}

export default App;
