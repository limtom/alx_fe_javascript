document.addEventListener("DOMContentLoaded", function () {
  //Create an array of quotes object
  let quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      category: "Inspiration",
    },
    {
      text: "Be the change that you wish to see in the world.",
      category: "Wisdom",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      category: "Perseverance",
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      category: "Optimism",
    },
    {
      text: "The journey of a thousand miles begins with one step.",
      category: "Motivation",
    },
  ];

  //Get the button
  const quoteBtn = document.getElementById("newQuote");
  quoteBtn.addEventListener("click", function () {
    showRandomQuote();
  });
  const showRandomQuote = function () {
    //Generate a randomm number from 0 to 4
    let num = Math.floor(Math.random() * quotes.length);
    let quoteToDisplay = quotes[num].text;

    // INNERHTML APPROACH
    const blockquote = `<blockquote>${quoteToDisplay}</blockquote>`;

    //Get the quoteDisplay
    const quoteContainer = document.getElementById("quoteDisplay");
    quoteContainer.innerHTML = blockquote;

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

    //Clear the quotes
    quoteText.value = "";
    quoteCategory.value = "";
    console.log(quotes);
  });
});
