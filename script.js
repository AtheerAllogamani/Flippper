document.addEventListener("DOMContentLoaded", function() {
  // Load saved cards from local storage
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];

  // Render saved cards
  if (savedCards.length > 0) {
    savedCards.forEach(function(savedCard) {
      createCard(savedCard.front, savedCard.back);
    });
  }

  const addButton = document.getElementById("addButton");
  const h1 = document.querySelector("h1");

  h1.appendChild(addButton);

  addButton.addEventListener("click", function() {
    const frontText = prompt("Enter front text:");
    const backText = prompt("Enter back text:");
    if (frontText && backText) {
      createCard(frontText, backText);
      saveCard(frontText, backText);
    }
  });
  function createCard(frontText, backText) {
    const cardContainer = document.getElementById("cardContainer");
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    const front = document.createElement("div");
    const back = document.createElement("div");
    front.classList.add("card-content", "front");
    front.innerText =frontText;
    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    // Edit button
    const editButton = document.createElement("button");
    const editButtonImage = document.createElement("img");
    editButtonImage.src = "assets/edit.png"; // Set the image source to the desired URL or path
    editButtonImage.alt = "Edit"; // Set the alt text for accessibility
    editButton.appendChild(editButtonImage);
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function(event) {
      const newFrontText = prompt("Enter updated front text:", frontText);
      const newBackText = prompt("Enter updated back text:", backText);
      if (newFrontText && newBackText) {
        frontText = newFrontText;
        backText = newBackText;
        front.innerText = frontText;
        saveCardsToLocalStorage();
      }
      event.stopPropagation();
    });
    card.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    const deleteButtonImage = document.createElement("img");
    deleteButtonImage.src = "assets/delete.png"; // Set the image source to the desired URL or path
    deleteButtonImage.alt = "Delete"; // Set the alt text for accessibility
    deleteButton.appendChild(deleteButtonImage);
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function(event) {
      cardContainer.removeChild(card);
      const index = savedCards.findIndex(function(savedCard) {
        return savedCard.front === frontText && savedCard.back === backText;
      });
      if (index !== -1) {
        savedCards.splice(index, 1);
        saveCardsToLocalStorage();
      }
      event.stopPropagation();
    });
    card.appendChild(deleteButton);

    card.addEventListener("click", function() {
      card.classList.toggle("flip");
      if (card.classList.contains("flip")) {
        front.innerText = backText;
        front.style.transform = "rotateY(-180deg)"; 
      } else {
        front.innerText = frontText;
        front.style.transform = "rotateY(0)"; 
      }
    });

    cardContainer.appendChild(card);
  }

  function saveCard(frontText, backText) {
    const card = { front: frontText, back: backText };
    savedCards.push(card);
    saveCardsToLocalStorage();
  }

  function saveCardsToLocalStorage() {
    localStorage.setItem("cards", JSON.stringify(savedCards));
  }
});