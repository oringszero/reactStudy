import { useState, useEffect } from 'react';

function getConversion(amount, selectedId, coins) {
  const selectedCoin = coins.find((c) => c.id === selectedId);
  const price = selectedCoin?.quotes?.USD?.price ?? 0;
  const amountNum = amount === "" ? 0 : Number(amount);
  const result = price > 0 ? amountNum / price : 0;
  return { selectedCoin, result };
}

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);

  const onAmountChange = (event) => setAmount(event.target.value);
  const onSelectChange = (event) => setSelectedId(event.target.value);

  const { selectedCoin, result } = getConversion(amount, selectedId, coins);

  const coinLength = loading ? null : `(${coins.length})`;
  const loadingText = <strong>Loading...</strong>;
  const coinSelect = (
    <select value={selectedId} onChange={onSelectChange}>
      <option value="">코인 선택</option>
      {coins.map((coin) => (
        <option key={coin.id} value={coin.id}>
          {coin.name} ({coin.symbol}) : ${coin.quotes?.USD?.price ?? 0} USD
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <h1>The Coins! {coinLength}</h1>
      {loading ? loadingText : coinSelect}
      <hr/>
      <input
        type="number"
        placeholder="Write the amount (USD)"
        value={amount}
        onChange={onAmountChange}
      />
      {selectedId && (
        <h3>You can buy {result.toFixed(4)} {selectedCoin?.symbol ?? ""}</h3>
      )}
    </div>
  );
}

export default App;