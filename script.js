const question1 = Array.from(document.querySelectorAll('.question1-container'));
      question1.forEach(element => {
        element.style.display = 'none';
      });
      const question2 = Array.from(document.querySelectorAll('.question2-container'));
      question2.forEach(element => {
        element.style.display = 'none';
      });

      const rightContainer = Array.from(document.querySelectorAll('.right'));
      rightContainer.forEach(element => {
        element.style.display = 'none';
      });

function generateMCQ() {
   var category;
   var userDifficulty;
   const button = document.querySelector('button');
   const spinner = document.querySelector('.spinner');

   // Show the spinner and disable the button
   spinner.style.display = 'inline-block';
   button.disabled = true;


   var number = document.getElementById("number-input").value;
   var selectedValue = document.getElementById("topic-select").value;
   var difficulty = document.getElementById("difficulty-select").value;
   console.log(difficulty);



   var request = new XMLHttpRequest();
   request.open('GET', 'https://opentdb.com/api.php?amount='+number+'&category=' + getCategoryId(selectedValue) + '&difficulty=' + difficulty + '&type=multiple');
   const rightContainer = Array.from(document.querySelectorAll('.right'));

   request.onload = function() {
     var response = JSON.parse(request.responseText);
     if(number==1){
      let container = document.getElementById('question2');
      if (container) {
        container.style.display = 'none';
      }
      spinner.style.display = 'none';
      button.disabled = false;
      const question2 = Array.from(document.querySelectorAll('.question2-container'));
      question2.forEach(element => {
        element.style.display = 'block';
      });
      displayQuestionAndOptions(response.results[0].question, response.results[0].incorrect_answers, response.results[0].correct_answer);
      rightContainer.forEach(element => {
         element.style.display = 'block';
       });
      const question1 = Array.from(document.querySelectorAll('.question1-container'));
      question1.forEach(element => {
        element.style.display = 'none';
      });
     }else{
      spinner.style.display = 'none';
      button.disabled = false;
      const question1 = Array.from(document.querySelectorAll('.question1-container'));
      question1.forEach(element => {
        element.style.display = 'block';
      });
      displayQuestionAndOptions(response.results[0].question, response.results[0].incorrect_answers, response.results[0].correct_answer);
      displayQuestionAndOptions1(response.results[1].question, response.results[0].incorrect_answers, response.results[0].correct_answer);
      rightContainer.forEach(element => {
         element.style.display = 'block';
       });
     }


     console.log(response);
   };

   request.send();

 }

 function getCategoryId(topic) {
   var categories = [
     { id: 9, name: "General Knowledge" },
     { id: 10, name: "Books" },
     { id: 11, name: "Film" },
     { id: 12, name: "Music" },
     { id: 13, name: "Musicals & Theatres" },
     { id: 14, name: "Television" },
     { id: 15, name: "Video Games" },
     { id: 16, name: "Board Games" },
     { id: 17, name: "Science" },
     { id: 18, name: "Computers" },
     { id: 19, name: "Mathematics" },
     { id: 20, name: "Mythology" },
     { id: 21, name: "Sports" },
     { id: 22, name: "Geography" },
     { id: 23, name: "History" },
     { id: 24, name: "Politics" },
     { id: 25, name: "Art" },
     { id: 26, name: "Celebrities" },
     { id: 27, name: "Animals" },
     { id: 28, name: "Vehicles" },
     { id: 29, name: "Comics" },
     { id: 30, name: "Gadgets" },
     { id: 31, name: "Japanese Anime & Manga" },
     { id: 32, name: "Cartoon & Animations" },
     { id: 32, name: "physics" },
     { id: 32, name: "physics" }
   ];

   for (var i = 0; i < categories.length; i++) {
     if (categories[i].name.toLowerCase() === topic.toLowerCase()) {
       return categories[i].id;
     }
   }
 }

 function displayQuestionAndOptions(question, incorrectAnswers, correctAnswer) {

      document.getElementById("question").innerHTML = question;

      var options = shuffleArray(incorrectAnswers.concat(correctAnswer));

      document.getElementById("option1-label").innerHTML = options[0];
      document.getElementById("option2-label").innerHTML = options[1];
      document.getElementById("option3-label").innerHTML = options[2];
      document.getElementById("option4-label").innerHTML = options[3];
      document.getElementById("answer").innerHTML ="Correct Answer : "+ correctAnswer;
      document.getElementById("option1").checked = false;
      document.getElementById("option2").checked = false;
      document.getElementById("option3").checked = false;
      document.getElementById("option4").checked = false;




 }
 function displayQuestionAndOptions1(question, incorrectAnswers, correctAnswer) {

   document.getElementById("question1").innerHTML = question;

   var options = shuffleArray(incorrectAnswers.concat(correctAnswer));

   document.getElementById("option1-label1").innerHTML = options[0];
   document.getElementById("option2-label2").innerHTML = options[1];
   document.getElementById("option3-label3").innerHTML = options[2];
   document.getElementById("option4-label4").innerHTML = options[3];
   document.getElementById("answer1").innerHTML ="Correct Answer : "+ correctAnswer;

   document.getElementById("option1").checked = false;
   document.getElementById("option2").checked = false;
   document.getElementById("option3").checked = false;
   document.getElementById("option4").checked = false;




}



 function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
     var j = Math.floor(Math.random() * (i + 1));
     var temp = array[i];
     array[i] = array[j];
     array[j] = temp;
   }
   return array;
 }