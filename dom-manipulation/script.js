document.addEventListener("DOMContentLoaded", function () {
  //Get the select input
  categorySelect = document.getElementById("categoryFilter");

  //Set the the default select value
  categorySelect.value = "all";

  //Get quotes from local storage
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  let filteredQuotes =
    JSON.parse(localStorage.getItem("filtered-quotes")) && [];

  //Get the quote container
  const quoteContainer = document.getElementById("quoteDisplay");

  //Display last viewed quotes
  quoteContainer.innerHTML = `<blockquote>
  ${JSON.parse(sessionStorage.getItem("last-quote")).text}
    </blockquote>`;

  //Get the button
  const quoteBtn = document.getElementById("newQuote");
  quoteBtn.addEventListener("click", function () {
    showRandomQuote();
  });

  //Show random quote function
  const showRandomQuote = function () {
    //Generate a randomm number from 0 to 4
    let num = Math.floor(Math.random() * quotes.length);
    let quoteToDisplay = quotes[num]?.text;

    // INNERHTML APPROACH
    const blockquote = `<blockquote>${quoteToDisplay}</blockquote>`;

    //Update the quote container
    quoteContainer.innerHTML = blockquote;

    //Store last view quote on session storage
    sessionStorage.setItem("last-quote", JSON.stringify(quotes[num]));

    /*
    DYNAMIC_METHOD
    //Create a blockquote element to display the quote
    const quoteBlock = document.createElement("blockquote");
    const textNode = document.createTextNode(quoteToDisplay);

    //Add the textnod to the quote block
    quoteBlock.appendChild(textNode);

    //Get the quoteDisplay
    const quoteContainer = document.getElementById("quoteDisplay");

    //Check if a quote already exists
    const existing = document.querySelector("blockquote");

    //If it exist replace otherwise append
    existing?.replaceWith(quoteBlock) ?? quoteContainer.appendChild(quoteBlock);
    */
  };

  //Add new quote
  //GEt the btn
  const addBtn = document.getElementById("add-btn");

  //Listen for event
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    createAddQuoteForm();
  });

  const createAddQuoteForm = function () {
    //Get the input form values
    let quoteText = document.getElementById("newQuoteText").value.trim();
    let quoteCategory = document
      .getElementById("newQuoteCategory")
      .value.trim();

    //Validate
    if (quoteText.length < 10 && quoteCategory.length < 10) {
      return;
    }

    //Create the quote object
    const quoteObj = {
      text: quoteText,
      category: quoteCategory,
    };

    //Push quote to the array
    quotes.push(quoteObj);

    //Save the quotes to localstorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    //Clear the quotes
    quoteText.value = "";
    quoteCategory.value = "";
    console.log(quotes);
  };

  //Export quote funct
  //Select the export btn
  const exportBtn = document.getElementById("exportBtn");

  exportBtn.addEventListener("click", function () {
    exportToJson(quotes);
  });

  function exportToJson(data, fileName = `quotes.json`) {
    //Create a downlaod link
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    );
    a.download = fileName.endsWith(".json") ? fileName : fileName + ".json";
    a.click();
  }

  // File inport
  const fileInput = document.getElementById("importFile");
  fileInput.addEventListener("change", function (e) {
    importFromJsonFile(e);
  });

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      //Save quotes to local storage
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }

  //Filtering
  function populateCategories(element, categories) {
    for (const category of categories) {
      const opt = document.createElement("option");
      opt.value = category;
      opt.textContent = category;
      element.appendChild(opt);
    }
  }

  //Get unique categories
  const uniqueCategories = quotes
    .map((quote) => quote.category)
    .filter((category, index, arr) => arr.indexOf(category) === index);

  // Populate the select
  populateCategories(selectedCategory, uniqueCategories);

  //Capture the selected category
  categorySelect.addEventListener("change", function (e) {
    //Set the value of the select
    categorySelect.value = e.target.value;
    //filter the quotes based on selection
    filterQuote(e.target.value);

    //Save selection to local storage
    localStorage.setItem("selectedCategory", e.target.value);
  });

  function filterQuote(category) {
    let quotesFiltered = quotes.filter((quote) => quote.category === category);
    localStorage.setItem("filtered-quotes", JSON.stringify(filteredQuotes));

    console.log(quotes);
    console.log(filteredQuotes);
    return filteredQuotes;
  }
});
