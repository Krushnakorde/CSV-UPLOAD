console.log('Im in');


document.getElementById("go").addEventListener("click", searchTable);

function searchTable() {
  

  // Get the input value and convert it to lowercase
  const input = document.getElementById("search-input").value.toLowerCase();
  
  
  // Get all table rows and iterate through them
  const rows = document.getElementsByTagName("td");


  

  for (let i = 0; i < rows.length; i++) {
    // Get the text content of each row and convert it to lowercase
    const rowText = rows[i].textContent.toLowerCase();

    console.log(rowText)

    
    // If the input value is found in the row text, highlight the row
    if (rowText.includes(input)) {
      rows[i].classList.add('highlight')
      
    } else {
      rows[i].classList.remove("highlight");
    }
  }
}