function addMenu() {
  
  var menu = SpreadsheetApp.getUi().createMenu('IMPORT DATA'); // Creates a menu named 'IMPORT DATA'
  menu.addItem('START IMPORT', 'getData'); // Adds an item 'Copy Data' to the menu which calls the getData function
  menu.addToUi(); // Adds the menu to the user interface
}

function onOpen(e) { // The onOpen function
  addMenu(); // Calls the addMenu function
}

function getData() { // The getData function
  var get_files = ['DATA 1' , 'DATA 2']; // Defines an array named get_files containing file names
  
  var ssa = SpreadsheetApp.getActiveSpreadsheet(); // Stores the active spreadsheet in the variable ssa
  var copySheet = ssa.getSheetByName('DATA'); // Stores the sheet named 'DATA' in the variable copySheet
  copySheet.getRange('A2:Z').clear();  // Clears data in the range 'A2:Z'
  
  for(var z = 0; z < get_files.length; z++) { // Iterates through each element in the get_files array
    var files = DriveApp.getFilesByName(get_files[z]); // Retrieves files by name from Google Drive
    while (files.hasNext()) {
      var file = files.next(); // Stores the next file in the variable file
      break; // Exits the loop
    }
  
    var ss = SpreadsheetApp.open(file); // Opens the file and stores it in the variable ss
    SpreadsheetApp.setActiveSpreadsheet(ss); // Sets the active spreadsheet to ss
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // Stores all sheets in the active spreadsheet in the variable sheets
    
    for(var i = 0; i < sheets.length; i++) { // Iterates through each sheet
      var nameSheet = ss.getSheetByName(sheets[i].getName()); // Stores the current sheet's name in the variable nameSheet
      var nameRange = nameSheet.getDataRange(); // Gets the data range of the current sheet
      var nameValues = nameRange.getValues(); // Gets the values from the data range
      
      for(var y = 1; y < nameValues.length; y++) { // Iterates through each value
        copySheet.appendRow(nameValues[y]); // Appends each value to the copySheet
      }     
    }    
  }  
}
