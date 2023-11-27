import { useEffect, useState } from "react";

const API = "https://v6.exchangerate-api.com/v6/";
const API_KEY = "your api key";

const CurrencyExchange = () => {
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [sourceCurrency, setSourceCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    async function loadCurrencies() {
      const response = await fetch(`${API}/${API_KEY}/latest/EUR`);
      const data = await response.json();
      data.conversion_rates &&
        setCurrencies(Object.keys(data.conversion_rates));
    }
    loadCurrencies();
  }, []);

  useEffect(() => {
    async function convert() {
      const response = await fetch(
        `${API}/${API_KEY}/pair/${sourceCurrency}/${targetCurrency}/${sourceAmount}`
      );
      const data = await response.json();
      setTargetAmount(data.conversion_result);
    }
    convert();
  }, [sourceAmount, sourceCurrency, targetCurrency]);

  return (
    <div>
      <input
        type="number"
        value={sourceAmount}
        onChange={(e) => setSourceAmount(Number(e.target.value))}
        data-testid="sourceAmount"
      />
      <select
        value={sourceCurrency}
        onChange={(e) => setSourceCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <input type="number" value={targetAmount} readOnly />
      <select
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyExchange;
