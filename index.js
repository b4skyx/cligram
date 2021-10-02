// Cligram : The Grammar Quiz
// Author: b4skyx
// Upstream: https://github.com/b4skyx/cligram

const readlineSync = require("readline-sync");

const num_questions = 7;
const data = require("./data.json");

var answered = 0;
var correct = 0;

var name = readlineSync.question("Beep Beep! Enter your name: ")
if (!readlineSync.keyInYN(`
Welcome to Cligam, ${name}.
Test your proficiency in english by answering a few questions.
Do you want to start?`)){
	process.exit();
}

// Rnadomize the questions fetched through data and return only the required number
function get_questions(){
	var questions = data["questions"];
	shuffled = questions.sort(() => 0.5 - Math.random());
	let selected = shuffled.slice(0, num_questions);
	return selected
}

// Function to check if the answer is correct or not
function check_answer(question, answer){
	if(question["answer"] === answer){
		return true;
	}
	else{
		return false;
	}
}

// Functino to ask question to the user.
function ask_question(question){
	var answer;
	if (question.hasOwnProperty('options')){
		console.log(question["question"]);
		index = readlineSync.keyInSelect(question['options'], "Select an option.");
		answer = question['options'][index];
	}
	else{
		var answer = readlineSync.question(question["question"]+"\nAnswer: ");
	}
	if (check_answer(question, answer)){
		console.log("Correct!");
		answered++;
		correct++;
	}
	else{
		console.log("Incorrect. The correct answer is: "+question["answer"])
		answered++;
	}
}

var questions = get_questions();
// Iterate through the questin list and ask
for (let index in questions){
	console.log(`\n=== Question ${parseInt(index)+1} ===\n`)
	ask_question(questions[index]);
}

// Print statistics
console.log("\n========== Stats ==========\n")
console.log("You secured "+(correct/num_questions*100).toFixed(2)+"%");
console.log("Total Questions: "+num_questions);
console.log("Correct: "+correct);
console.log("Wrong: "+(num_questions-correct))
console.log("\n===========================\n")
