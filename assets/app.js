// GLOBAL VARIABLES 
// ==========================================================================

// Array of word options (all lowercase)
var wordsList = ["tupac", "drdre", "snoopdog", "icecube", "kendricklamar", "eazye", 
"schoolboyq", "natedogg", "jayrock", "vincestaples", "nwa", "warreng"];
// Solution 
var chosenWord = "";
// Breaks the solution into individual letters to be stored in array
var lettersInChosenWord = [];
// Number of blanks we show based on the solution
var numBlanks = 0;
// Mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS 
// ==========================================================================

// Function to start (and restart) the game
function startGame() {
	// Reset the guesses back to 9
	numGuesses = 9;

	// Solution chosen randomly from wordsList
	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
	// Break selected word into individual letters.
	lettersInChosenWord = chosenWord.split("");
	// Count the number of letters in the word
	numBlanks = lettersInChosenWord.length;

	// Test in console
	console.log(chosenWord);

	// *Important: Reset the guess and success array at each round
	blanksAndSuccesses = [];

	// *Important: Reset the wrong guesses from the previous round
	wrongGuesses = [];

	// Fill up the blanksAndSuccesses list with appropriate number of blanks
	// This is based on number of letters in solution
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	};

	// Test in console
	console.log(blanksAndSuccesses);

	// Reprints the guessesLeft to 9
	document.getElementById("guesses-left").innerHTML = numGuesses;
	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	// Clears the wrong guesses from the previous round
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
};

// Function for comparing letters to matches 
function checkLetters(letter) {
	// This boolean will be toggled based on whether or not a user letter is found anywhere in the word
	var letterInWord = false;

	// Check if a letter exists inside the array 
	for (var i = 0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			// If the letter exists then toggle this boolean to true
			letterInWord = true;
		}
	}

	// If the letter exists somewhere in the word, then figure out exactly where 
	if (letterInWord) {
		// Loop through the word
		for (var j = 0; j < numBlanks; j++) {
			// Populate the blanksAndSuccesses with every instance of the letter
			if (chosenWord[j] === letter) {
				// Set the specific space in blanks and letter equal to the letter when there is a match
				blanksAndSuccesses[j] = letter;
			}
		}
		// Test
		console.log(blanksAndSuccesses);
	}
	// If the letter doesn't exist at all
	else {
		// Add the letter to the list of wrong letters, and subtract one of the guesses.
		wrongGuesses.push(letter);
		numGuesses--;
	}
};

// Function to run after each guess is made 
function roundComplete() {
	// Log inital status update in the console
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses, and update correct guesses
	document.getElementById("guesses-left").innerHTML = numGuesses;
	// Print the array of guesses and blanks onto the page
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	// Print the wrong guesses onto the page
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// If all the letters match the solution
	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		// Add to the win counter and alert the user
		winCounter++;
		alert("You win!");

		// Update the win counter in the HTML and restart the game
		document.getElementById("win-counter").innerHTML = winCounter;
		startGame();
	}

	// If user runs out of guesses
	else if (numGuesses === 0) {
		// Add to the loss counter and alert the user
		lossCounter++;
		alert("You lose");

		// Update the loss counter in the HTML and restart the game
		document.getElementById("loss-counter").innerHTML = lossCounter;
		startGame();
	}
}; 

// MAIN PROCESS
// ==========================================================================

// Start game
startGame();

// Initiate click listners
document.onkeyup = function(event) {
	// Converts all key clicks to lowercase letters
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	// Runs the code to check for correctness
	checkLetters(letterGuessed);
	// Runs the code after each round is done
	roundComplete();
}
