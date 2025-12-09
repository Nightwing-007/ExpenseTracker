const balance = document.getElementById('balance');
const money_plus = document.getElementById('plus');
const money_minus = document.getElementById('minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//array to add all the expenses and income - empty array
let transactions = [];
let x = 0;
// function to add transactions to the transactions array.
function addTransaction(e) {
    e.preventDefault(); // Stop form from submitting and refreshing page

    if (text.value === '' || amount.value === '') {
        alert('Please add a text and amount');
    }
    else {
        const transaction = {
            id: x++,
            text: text.value,
            amount: Number(amount.value)
        };

        transactions.push(transaction);//appending the expense or the income to the transactions array
        addTransactionDOM(transaction);
        updateValues();

        text.value = '';
        amount.value = '';
    }
}

//This function is the one which adds the expense or the income to the unordered list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');//creates the element to add the expense or the income

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="deleteBtn" onclick="removeTransaction(${transaction.id})">Delete</button>
  `;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);//looping through every object in transactions and taking only the exprnse or the income amount
    const total = amounts.reduce((acc, item) => {
        return acc += item
    }, 0);//reduce is used to add everything(income and expense)

    //all positive numbers are added
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => {
            return acc += item
        }, 0);

    //all negative numbers are added
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    );

    //html is replaced using innerHTML
    balance.innerText = `${total}`;
    money_plus.innerText = `+${income}`;
    money_minus.innerText = `-${expense}`;
}

//to remove income or expense
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    //init() is used to call all the functions and update everything
    init();
}

function init() {
    list.innerHTML = ''; // Clear the list
    transactions.forEach(addTransactionDOM); // Add each item to DOM
    updateValues(); // Calculate balance
}

init();

//when the submit button is clicked all the values in the respected boxes are fetched by the respective methods when the addTransaction method is called
form.addEventListener('submit', addTransaction);