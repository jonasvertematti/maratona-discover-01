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
    }
};

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Criação de Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index, 1);
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionContainer.appendChild(tr);

    },
    innerHTMLTransaction(transaction) {
        const transactionClass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html =
            `<td class="description">${transaction.description}</td>
            <td class="${transactionClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>`;

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

const Utils = {
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
    validateFields() {
        Form.getInputs().forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("required");
                input.addEventListener("input", () => {
                    input.classList.remove("required");
                })
            }
        });
    },
    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
        } catch (error) {
            alert(error.message);      
        }
    }
}


const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        });

        DOM.updateBalance();
    },
    reload() {
        DOM.clearTransaction();
        App.init();
    }
}


App.init();

Transaction.add({
    id: 10,
    date: "23/06/1993",
    amount: 30000,
    description: "aniversário"
})