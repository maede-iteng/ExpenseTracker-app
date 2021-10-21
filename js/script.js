const addBtn = document.getElementById('main__add-btn'),
      mainSection = document.getElementById('main__section'),
      inputNumber = document.getElementById('main__input-number'),
      textareaEl = document.getElementById('main__textarea'),
      inputDate = document.getElementById('main__input-date'),
      expenseEl = document.getElementById('main__expense'),
      selectEl = document.getElementById('main__select');


const LOCAL_Storage_KEY = JSON.parse(localStorage.getItem('list'));
let list = localStorage.getItem('list') !== null ? LOCAL_Storage_KEY : [];

addBtn.addEventListener('click' , () => {
    mainSection.style.display = 'block';
    addBtn.style.display = 'none';
});

function transaction(){
    if(selectEl.value.trim() === null || inputNumber.value.trim() === null || inputDate.value.trim() === null || textareaEl.value.trim() === null){
        return;
    }
    let transactionList = {
        id:Math.random() * 100,
        amount: parseInt(inputNumber.value),
        title:selectEl.value,
        dateValue:inputDate.value,
        textArea:textareaEl.value
    };
    list.push(transactionList);
    transactionUI(transactionList);
    showTotal();
    updateLocalStorage();
    document.forms[0].reset();

}
function showDate(){
    const newDate = new Date();
    const month =  new Intl.DateTimeFormat('en-US', {month:'long'}).format(newDate);
    document.getElementById('year').innerText = month + ' ' + newDate.getDate() + ', ' +newDate.getFullYear();
}
showDate();
function transactionUI(list){
    let expenseSection = document.createElement('li');
    expenseSection.classList.add('expenses');
    expenseSection.innerHTML = `
        
        <span id="date">${list.dateValue.toLocaleString('en-US' , { day : '2-digit' })}</span>
        <div id="expense-type">
            <span id="title">${list.title}</span>
            <span id="description">${list.textArea}</span>
        </div>
        <h2 id="cost" class="${list.title === 'Income' ? 'income' : 'expense'}">${currencyFormat(list.amount)}</h2>
        <span id="delete" onclick="deleteTransaction(${list.id})">&#x2715</span>
    `;
    expenseEl.appendChild(expenseSection);
    mainSection.style.display = 'none';
    addBtn.style.display = 'block';
}
function currencyFormat(amount) {
   let cFormat = new Intl.NumberFormat("en-US", {
       style:"currency",
       currency:"USD"
   });
    if(selectEl.value === 'Income'){
        return cFormat.format(amount);

    }else if(selectEl.value === 'Expense') {
        return '-' + cFormat.format(amount);
    }
}
function showTotal(){
   let sum = 0;
     list.forEach(list => {
       if(list.title === 'Income'){
           sum += list.amount
       }else if(list.title === 'Expense'){
           sum -= list.amount;
       }
   });
    document.getElementById('main__cost').innerText = currencyFormat(sum);
}
function updateLocalStorage(){
    localStorage.setItem('list',JSON.stringify(list));
}
function deleteTransaction(id){
    let c = confirm('Are you sure you want to delete this?');
    if(c){
        let transactionID = list.findIndex(t => t.id === id);
        list.splice(transactionID , 1);
    }
    updateLocalStorage();
    Init();
}
function Init() {
    expenseEl.innerHTML = "";
    list.forEach(transactionUI);
    showTotal();
}
Init();