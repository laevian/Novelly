
// closure
$(document).ready(function(){

var currentData;
var currentSheet;
var currentChar;

// object literal for characters.
  var character = {
  index: 0,
  name: "New Character",
  picture: "characterprev.svg",
  bio: "Write your character's bio here."
};

// JS array to contain all characters, in order
var characters = [Object.create(character)];

  //When you click on the "Add new sheet button", it appends a new sheet to the container and makes the new one active.
  $(".actioncont .add").click(function(){
    // adding to the DOM
    $(".stackscontainer").append("<div class='sheet'><p class='content'>Your text goes here.</p></div>");
    makeActive($(".sheet:last-child"));
  });

  $(".actioncont .delete").on("click", function(){
    $(currentSheet).remove();
    makeActive($(".sheet:last-child"));
  });




  $(".actioncont-v .add").click(function(){
    $(".charactercontainer").append("<div class='character'><p class='name'>New Character</p></div>");
    var newChar = Object.create(character);
    newChar.index = characters.length;
    characters.push(newChar);
    makeActiveChar(newChar);
  });

  $(".actioncont-v .delete").click(function(){
    var currentIndex = $(currentChar).index();
    $(currentChar).remove();
    makeActiveChar(characters[currentIndex-1]);
  });

/*
  $(".actioncont-v .delete").on("click", function(){
    // removing from DOM
    if (// a character is selected)
    {
    $(currentSheet).remove();
    makeActive($(".character:last-child"));
    }
  }); */


  // event: when you click on a sheet, it becomes active.
  $(".stackscontainer").on('click', '.sheet', function(){
    makeActive(this);
  });

  $(".charactercontainer").on('click', '.character', function(){

    var thisIndex = $(this).index();
    var thisChar = characters[thisIndex];
    makeActiveChar(thisChar);
  });


    // reads in a selected "sheet" div, updates the highlighting, and then
    // changes the main textarea to contain the selected sheet's text. Eventually
    // I'd like to refactor this so that I only have one makeActive function, but for now... well.
    var makeActive = function(sheet) {

      $(".activename").remove();

      currentData = $(sheet).children("p").html();
      currentSheet = sheet;

      // removes the 'active' glow from all sheets
      $(".sheet").each(function(){
        // DOM traversal
        $(this).children("p").removeClass("activeglow");
      });

      $(".character").each(function(){
        $(this).removeClass("activeglow");
      });


      // applies the 'active' glow to the active sheet
      $(sheet).children("p").addClass("activeglow");

      // changes the text in the main textarea to be the selected sheet's text
      $(".activesheet textarea").val($(sheet).children("p").text());

    };

    // when you click off of the main textarea, it saves the data
    $(".activesheet textarea").on("blur", function(){

      // need to find the .activeglow - if it's on a character, do something different
      var currentActive = $(".activeglow")[0];
      var newText = $(".activesheet textarea").val();

      if ($(currentActive).hasClass("character")) {
        var currentIndex = $(currentChar).index();
        var name = $(".activename").val();
        characters[currentIndex].bio = newText;
        characters[currentIndex].name = name;
        $(currentChar).children("p").text(name);
      }

      else {
      $(currentSheet).children("p").text(newText);
      }
    });


    // Even I'm not really sure why I decided to do this two different ways,
    // but this way works better for characters...
    var makeActiveChar = function(char) {

      $(".activename").remove(); // more hacks. agh. but it works yay.

      currentChar = $(".character")[char.index];
      console.log(char.name);

      var input = "<input class='activename' type='text' placeholder=\"" + char.name + "\"></input>";
      $(".activesheet").prepend(input);


      // removes the 'active' glow from all sheets
      $(".sheet").each(function(){
        $(this).children("p").removeClass("activeglow");
      });
      $(".character").each(function(){
        $(this).removeClass("activeglow");
      });

      // applies the 'active' glow to the active sheet
      $(currentChar).addClass("activeglow");

      $(".activesheet textarea").val(char.bio);

    }

}); // end of ready function, do not delete (again)
