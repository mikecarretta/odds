(function(){
  var count = 0;
  var min = 1;
  var max = 44;
  var sets = 3;
  // sort numbers function to user input and random rumber arrays.
  function sortNumbers(a, b) {
    return a - b;
  }

  // http://stackoverflow.com/questions/21422272/javascript-compare-two-arrays
  // compare the user input array and the random number array
  function compareArrays(a, b) {
    return !a.some(function (e, i) {
        return e != b[i]; // return true or false
    });
  }

  // Creates a random array containing unique numbers
  function randomArray() {
    var results = [];
    while (results.length < sets) {
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // if the number is not in the array then push to results
      if (results.indexOf(randomNumber) == -1) {
        results.push(randomNumber);
      }
    }
    results.sort(sortNumbers);
    return results;
  }

  // Calculates the possible combinations
  function possibleCombos() {
    var possiblities = max * (max - 1) * (max - 2);
    var factorial = 1 * 2 * 3;
    var sum = possiblities / factorial;
    return formatNumber(sum);
  }

  // Add a comma as thousands separator
  function formatNumber(num) {
    // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  // User clicks the Start button
  $('.randomButton').on('click', function() {
    $('.alert').addClass('hidden'); // reset alert if needed
    $('.countParagraph').addClass('hidden'); // reset alert if needed

    var userSet = []; // user number input values

    var set1 = $('#set1').val();
    userSet.push(set1);
    var set2 = $('#set2').val();
    userSet.push(set2);
    var set3 = $('#set3').val();
    userSet.push(set3);
    /*  Too many combinations - kills the browser window
        Need to add a timeout or something else?
    var set4 = $('#set4').val();
    userSet.push(set4);
    var set5 = $('#set5').val();
    userSet.push(set5);
    var set6 = $('#set6').val();
    userSet.push(set6);
    */
    userSet.sort(sortNumbers);

    // user input validation, if good run the generator, else show alert message
    if (set1 >= min && set1 <= max
        && set2 >= min && set2 <= max
        && set3 >= min && set3 <= max) {
      do {
        count ++;
        // This compares the user input array and the random array and holds the result
        var compare = compareArrays(randomArray(), userSet);

        var randomNumCombine = randomArray().join(' ');

        $('#numbers').append('<div class="results">'
          + randomNumCombine
          + '</div>');
        $('#count').text(formatNumber(count));
      // while false repeat do
      } while (compare === false) {
        // while true, update the and display the count and the alert
        if (compare === true) {
          $('#numbers').append('<div class="results match">'
          + 'Match!'
          + '</div>');

          var finalNum = formatNumber(count);
          $('#count').text(finalNum);
          // Match confirmation and final calculation
          $('.countParagraph').removeClass('hidden');
          var years = count / 365;
          $('#years').text(years.toFixed(2));
        }
      }
    } else {
      $('.alert').removeClass('hidden');
    }
  });

  // User can click the Reset button to remove all the values and text
  $('.reset').on('click', function() {
    count = 0;
    $('.alert').addClass('hidden');
    $('.countParagraph').addClass('hidden');
    $('#count').text(0);
    $('#numbers').empty();
    $('#years').empty();
    $('#set1').val(1);
    $('#set2').val(2);
    $('#set3').val(3);
    /*  Too many combinations - kills the browser window
        Need to add a timeout or something else?
    $('#set4').val(4);
    $('#set5').val(5);
    $('#set6').val(6);
    */
  });

  $('#combos').text(possibleCombos());
}());
