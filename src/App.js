import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [form, setForm] = useState({
    house: 0,
    driveway: 0,
    roof: 0,
    gutter: 0,
    addons: 0,
    laborRate: 75,
    time: 0,
    chemicals: 0,
    profit: 30
  });

  const [quote, setQuote] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) || 0 });
  };

  const generateQuote = () => {
    const cost = form.laborRate * form.time + form.chemicals;
    const base = form.house * 0.15 + form.driveway * 0.12 + form.roof * 0.2 + form.gutter * 0.1 + form.addons * 0.1;
    const totalCost = base + cost;
    const profitAmount = totalCost * (form.profit / 100);
    const total = totalCost + profitAmount;
    const quoteId = `BTC-${Math.floor(10000 + Math.random() * 90000)}`;

    const summary = {
      id: quoteId,
      base: base.toFixed(2),
      cost: cost.toFixed(2),
      profit: profitAmount.toFixed(2),
      total: total.toFixed(2),
    };

    setQuote(summary);
    localStorage.setItem(quoteId, JSON.stringify(summary));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Pressure Washing Quote Builder</h1>
        {['house', 'driveway', 'roof', 'gutter', 'addons', 'laborRate', 'time', 'chemicals'].map(field => (
          <div key={field} className="mb-3">
            <label className="block capitalize">{field}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
        <div className="mb-3">
          <label>Profit Margin: {form.profit}%</label>
          <input
            type="range"
            name="profit"
            min="0"
            max="100"
            value={form.profit}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <button onClick={generateQuote} className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Generate Quote
        </button>

        {quote && (
          <div className="mt-6 bg-gray-50 p-4 rounded shadow">
            <p><strong>Quote ID:</strong> {quote.id}</p>
            <p><strong>Service Base:</strong> ${quote.base}</p>
            <p><strong>Estimated Cost:</strong> ${quote.cost}</p>
            <p><strong>Profit:</strong> ${quote.profit}</p>
            <p><strong>Total:</strong> ${quote.total}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;