const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active');
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active');
        Form.clearFields();
    }
};

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("transactions")) || [];
    },
    set(transactions) {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
};

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });

        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });

        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);

        DOM.transactionContainer.appendChild(tr);

    },
    innerHTMLTransaction(transaction, index) {
        const transactionClass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html =
            `<td class="description">${transaction.description}</td>
            <td class="${transactionClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick=Transaction.remove(${index}) src="./assets/minus.svg" alt="Remover transação"></td>`;

        return html;
    },
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransaction() {
        DOM.transactionContainer.innerHTML = "";
    }
};


const Form = {
    description: document.getElementById("description"),
    amount: document.getElementById("amount"),
    date: document.getElementById("date"),

    getInputs() {
        return [
            Form.description,
            Form.amount,
            Form.date
        ]
    },
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    formatValues() {
        let {description, amount, date} = Form.getValues();
        amount = Utils.formatAmount(amount);
        return {
            description,
            amount,
            date
        }

    },
    dateMask({target, key}) {
        if(key === "Backspace") {
          //ignore backspace 
        }
        else if (target.value.match(/^\d{2}$/) != null) {
            target.value += "/";
        }
        else if (target.value.match(/^\d{2}\/\d{2}$/) != null) {
            target.value += "/";
        }
    },
    validateFields() {
        let invalidFields = false;
        Form.getInputs().forEach(input => {

            if (input.value.trim() === "") {
                input.classList.add("required");

                input.addEventListener("input", () => {
                    input.classList.remove("required");
                });

                invalidFields = true;
            }
        });

        if (invalidFields) {
            throw new Error();
        }
    },
    clearFields() {
        Form.getInputs().forEach(input => {
            input.value = "";
            input.classList.remove("required");
        });

    },
    submit(event) {
        event.preventDefault();
        
        try {
            Form.validateFields();
            const transaction = Form.formatValues();
            Transaction.add(transaction);
            Form.clearFields();
            Modal.close();
        } catch (error) {}
        
    }
}



const Utils = {
    formatAmount(amount) {
        return Math.round(Number(amount) * 100);
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
};


const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction);
        DOM.updateBalance();

        Storage.set(Transaction.all);
    },
    reload() {
        DOM.clearTransaction();
        App.init();
    }
}

App.init();

