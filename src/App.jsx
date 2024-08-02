/******w**************

    Assignment 5 React
    Name: Harshdeep Devgan
    Date: 1st August, 2024

*********************/

import "./styles.css";
import "mvp.css";
import React, { useState, useEffect } from "react";

// Fetching Data from API link
function FetchingDogBreedList(url) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      setBreeds(Object.keys(json.message)); // Set breeds list
    }
    fetchData();
  }, [url]);

  return breeds;
}

function CreateDogCard({ breed }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      if (breed) {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const json = await response.json();
        setImages(json.message.slice(0, 5)); // Limit to 5 images for brevity
      }
    }
    fetchImages();
  }, [breed]);

  return (
    <div className="container">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="dog_card">
            <img src={image} alt={breed} />
            <h2>{breed}</h2>
            <button onClick={() => alert(`This is a ${breed}`)}>
              Details
            </button>
          </div>
        ))
      ) : (
        <p>No images found for the specified breed.</p>
      )}
    </div>
  );
}

// Display Index on Screen for Searching
function SearchingDog({ setSearchTerm, setErrorMessage }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    const trimmedInput = inputValue.trim().toLowerCase();
    if (trimmedInput) {
      setSearchTerm(trimmedInput);
    }
    setInputValue(""); // Clear input after searching
  };

  return (
    <>
      <h1>🐾 Dog Finder 🐾</h1>
      <p>A searching tool to find images of your favorite dog breeds.</p>
      <div className="search_index">
        <input
          id="search_bar"
          type="text"
          placeholder="Search your favorite dog breed 🐶"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="search_button" onClick={handleSearch}>
          🔎
        </button>
      </div>
    </>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const breeds = FetchingDogBreedList("https://dog.ceo/api/breeds/list/all");

  useEffect(() => {
    if (searchTerm && !breeds.includes(searchTerm)) {
      setErrorMessage(`Breed "${searchTerm}" not found. Please try another breed.`);
    } else {
      setErrorMessage("");
    }
  }, [searchTerm, breeds]);

  return (
    <>
      <SearchingDog setSearchTerm={setSearchTerm} setErrorMessage={setErrorMessage} />
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        breeds.includes(searchTerm) && searchTerm && (
          <CreateDogCard breed={searchTerm} />
        )
      )}
    </>
  );
}


