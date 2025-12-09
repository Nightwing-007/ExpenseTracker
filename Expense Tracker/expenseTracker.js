// 1. Select DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('plus');
const money_minus = document.getElementById('minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 2. Initialize State (The data)
// We start with an empty array. New transactions will be pushed here.
let transactions = [];

// 3. Function to Add a Transaction
function addTransaction(e) {
    e.preventDefault(); // Stop form from submitting and refreshing page

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: Number(amount.value) // The '+' converts the string value to a number
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();

        // Clear inputs
        text.value = '';
        amount.value = '';
    }
}

// 4. Function to Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// 5. Function to Add Transaction to DOM (The UI)
function addTransactionDOM(transaction) {
    // Get sign (negative or positive)
    const sign = transaction.amount < 0 ? '-' : '+';

    // Create list item
    const item = document.createElement('li');

    // Add class based on value (for the green/red border)
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    // Set the HTML inside the li
    // Math.abs removes the negative sign so we can control it manually
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="deleteBtn" onclick="removeTransaction(${transaction.id})">Delete</button>
  `;

    // Append to the list (ul)
    list.appendChild(item);
}

// 6. Function to Update the Balance, Income and Expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    // Calculate Total Balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Calculate Income (only positive numbers)
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    // Calculate Expense (only negative numbers)
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    // Update DOM
    balance.innerText = `${total}`;
    money_plus.innerText = `+${income}`;
    money_minus.innerText = `-${expense}`;
}

// 7. Function to Remove Transaction by ID
function removeTransaction(id) {
    // Filter out the transaction with the matching ID
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Re-initialize the app to reflect changes
    init();
}

// 8. Init App
function init() {
    list.innerHTML = ''; // Clear the list
    transactions.forEach(addTransactionDOM); // Add each item to DOM
    updateValues(); // Calculate balance
}

init();

// Event Listeners
form.addEventListener('submit', addTransaction);