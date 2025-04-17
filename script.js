let data = JSON.parse(localStorage.getItem('data')) || [];

// Function to create a new record
function createRecord(name, email) {
  const record = { id: Date.now(), name, email };
  data.push(record);
  localStorage.setItem('data', JSON.stringify(data));
  displayRecords();
}

// Function to display records
function displayRecords() {
  const recordsBody = document.getElementById('records-body');
  recordsBody.innerHTML = '';
  data.forEach((record) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td>${record.email}</td>
      <td>
        <button class="update-btn" data-id="${record.id}">Update</button>
        <button class="delete-btn" data-id="${record.id}">Delete</button>
      </td>
    `;
    recordsBody.appendChild(row);
  });
}

// Function to update a record
function updateRecord(id, name, email) {
  const index = data.findIndex((record) => record.id === parseInt(id));
  if (index !== -1) {
    data[index].name = name;
    data[index].email = email;
    localStorage.setItem('data', JSON.stringify(data));
    displayRecords();
  }
}

// Function to delete a record
function deleteRecord(id) {
  const index = data.findIndex((record) => record.id === parseInt(id));
  if (index !== -1) {
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    displayRecords();
  }
}

// Event listener for create button
document.getElementById('create-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  createRecord(name, email);
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
});

// Event listener for update buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('update-btn')) {
    const id = e.target.dataset.id;
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');
    updateRecord(id, name, email);
  }
});

// Event listener for delete buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    deleteRecord(id);
  }
});

// Display records on page load
displayRecords();

 