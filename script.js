// Retrieve the entries from local storage
var entries = JSON.parse(localStorage.getItem('entries')) || [];

// Define the functions to add, search, edit, save, and cancel entries
function addEntry() {
  var harness = document.getElementById('harness-input').value;
  var login = document.getElementById('login-input').value;
  var date = document.getElementById('date-input').value;
  var value = document.getElementById('value-input').value;
  var entry = { harness: harness, login: login, date: date, value: value };
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries();
}

function searchEntry() {
  var searchValue = document.getElementById('search-input').value;
  var searchResults = entries.filter(function(entry) {
    return entry.value == searchValue;
  });
  displayEntries(searchResults);
}

function editEntry(index) {
  var entryDiv = document.getElementById(`entry-${index}`);
  var harness = entryDiv.querySelector('.harness-value').textContent;
  var login = entryDiv.querySelector('.login-value').textContent;
  var date = entryDiv.querySelector('.date-value').textContent;
  entryDiv.innerHTML = `
    <div class="harness-value"><input type="text" value="${harness}"></div>
    <div class="login-value"><input type="text" value="${login}"></div>
    <div class="date-value"><input type="date" value="${date}"></div>
    <div class="value-value">${entries[index].value}</div>
    <div class="entry-buttons">
      <button onclick="saveEntry(${index})">Save</button>
      <button onclick="cancelEdit(${index})">Cancel</button>
    </div>
  `;
}

function saveEntry(index) {
  var entryDiv = document.getElementById(`entry-${index}`);
  var harness = entryDiv.querySelector('.harness-value input').value;
  var login = entryDiv.querySelector('.login-value input').value;
  var date = entryDiv.querySelector('.date-value input').value;
  entries[index].harness = harness;
  entries[index].login = login;
  entries[index].date = date;
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries();
}

function cancelEdit(index) {
  var entry = entries[index];
  var entryDiv = document.getElementById(`entry-${index}`);
  entryDiv.innerHTML = `
    <div class="harness-value">${entry.harness}</div>
    <div class="login-value">${entry.login}</div>
    <div class="date-value">${entry.date}</div>
    <div class="value-value">${entry.value}</div>
    <div class="entry-buttons">
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    </div>
  `;
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries();
}

function displayEntries(searchResults) {
  var entriesDiv = document.getElementById('entries');
  entriesDiv.innerHTML = '';
  var entriesToDisplay = searchResults || entries;
  entriesToDisplay.forEach(function(entry, index) {
    var entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.id = `entry-${index}`;
    entryDiv.innerHTML = `
      <div class="harness-value">${entry.harness}</div>
      <div class="login-value">${entry.login}</div>
      <div class="date-value">${entry.date}</div>
      <div class="value-value">${entry.value}</div>
      <div class="entry-buttons">
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    entriesDiv.appendChild(entryDiv);
  });
}

// Display the entries
displayEntries();

// Add event listeners for the buttons
document.getElementById('add-button').addEventListener('click', function() {
  addEntry();
});

document.getElementById('search-button').addEventListener('click', function() {
  searchEntry();
});

document.getElementById('new-entry-form').addEventListener('submit', function(event) {
  event.preventDefault();
  addEntry();
});
