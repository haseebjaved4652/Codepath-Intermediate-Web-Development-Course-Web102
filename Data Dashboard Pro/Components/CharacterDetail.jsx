// CharacterDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import md5 from "js-md5";

const CharacterDetail = () => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const timeStamp = new Date().getTime();
      const publicKey = "756a3b8303dc5198d1a65ba2d29f8425";
      const privateKey = "18d69adbfad63e8efdfc688e3707a6b32cdd92e8";
      const hash = md5(timeStamp + privateKey + publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${id}`,
          {
            params: {
              ts: timeStamp,
              apikey: publicKey,
              hash: hash,
            },
          }
        );
        setCharacterDetails(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!characterDetails) {
    return <p>Loading character details...</p>;
  }

  // Construct the image URL
  const imageUrl = `${characterDetails.thumbnail.path}/portrait_incredible.${characterDetails.thumbnail.extension}`;

  return (
    <div className="character-detail-container">
      <h1>{characterDetails.name}</h1>
      <img
        src={imageUrl}
        alt={`Portrait of ${characterDetails.name}`}
        className="character-portrait"
      />
      <p>{characterDetails.description || "No description available."}</p>

      {characterDetails.urls?.length > 0 && (
        <div>
          <h3>Related Links</h3>
          <ul>
            {characterDetails.urls.map((url, index) => (
              <li key={index}>
                <a href={url.url} target="_blank" rel="noopener noreferrer">
                  {url.type}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {characterDetails.stories?.items?.length > 0 && (
        <div>
          <h3>Stories</h3>
          <ul>
            {characterDetails.stories.items.map((story, index) => (
              <li key={index}>{story.name}</li>
            ))}
          </ul>
        </div>
      )}

      {characterDetails.events?.items?.length > 0 && (
        <div>
          <h3>Events</h3>
          <ul>
            {characterDetails.events.items.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* You can continue adding other sections like series, comics, etc. */}
    </div>
  );
};

export default CharacterDetail;
