function updateUI() {
  let balance = 0, income = 0, expenses = 0;
  document.getElementById("entry-list").innerHTML = "";
  entries.forEach((entry, index) => {
      let li = document.createElement("li");
      li.className = entry.type;
      li.innerHTML = `${entry.description} - $${entry.amount} 
          <span>
              <button onclick="editEntry(${index})">✏️</button>
              <button onclick="deleteEntry(${index})">❌</button>
          </span>`;
      document.getElementById("entry-list").appendChild(li);
      if (entry.type === "income") income += parseFloat(entry.amount);
      else expenses += parseFloat(entry.amount);
  });
  balance = income - expenses;
  document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
  document.getElementById("total-income").innerText = `$${income.toFixed(2)}`;
  document.getElementById("total-expenses").innerText = `$${expenses.toFixed(2)}`;
  localStorage.setItem("entries", JSON.stringify(entries));
}

function addEntry() {
  let description = document.getElementById("description").value;
  let amount = document.getElementById("amount").value;
  let type = document.querySelector('input[name="type"]:checked').value;
  if (!description || !amount) return alert("Please enter valid details");
  entries.push({ description, amount, type });
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  updateUI();
}

function deleteEntry(index) {
  entries.splice(index, 1);
  updateUI();
}

function editEntry(index) {
  let entry = entries[index];
  document.getElementById("description").value = entry.description;
  document.getElementById("amount").value = entry.amount;
  document.querySelector(`input[value="${entry.type}"]`).checked = true;
  deleteEntry(index);
}

function filterEntries(filterType) {
  let filteredEntries = entries.filter(entry => filterType === "all" || entry.type === filterType);
  document.getElementById("entry-list").innerHTML = "";
  filteredEntries.forEach((entry, index) => {
      let li = document.createElement("li");
      li.className = entry.type;
      li.innerHTML = `${entry.description} - $${entry.amount} 
          <span>
              <button onclick="editEntry(${index})"></button>
              <button onclick="deleteEntry(${index})"></button>
          </span>`;