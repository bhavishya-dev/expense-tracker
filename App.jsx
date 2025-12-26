import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  // ✅ DELETE FUNCTION YAHAN HOGA
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const totalAmount = filteredExpenses.reduce(
    (total, e) => total + e.amount,
    0
  );

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <form onSubmit={addExpense} className="form">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button>Add Expense</button>
      </form>

      <select
        className="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Other</option>
      </select>

      <ul className="list">
        {filteredExpenses.length === 0 && <p>No expenses</p>}

        {filteredExpenses.map((e) => (
          <li key={e.id}>
            <span>{e.title}</span>
            <span>₹{e.amount}</span>
            <span>{e.category}</span>
            <button onClick={() => deleteExpense(e.id)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalAmount}</h3>
    </div>
  );
}

export default App;
