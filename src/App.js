import "./App.css";
import { useState } from "react";

const URL = "https://api.exchangeratesapi.io/v1/latest?access_key=";
const API_KEY = "911b3806a1cbe40dacf96b52c007b3f3";

// my api key : EQRwBpTGU3oUfJE80RZZsPZiBlBGNwn4
// teacher's api key : 911b3806a1cbe40dacf96b52c007b3f3

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      console.log(address)
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert("Error retrieving exchange rate.");
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div>
          <label>EUR : </label>
          <input
            type="number"
            step="0.01"
            value={eur}
            onChange={(e) => setEur(e.target.value)}
          />
          <output>{rate}</output>
        </div>
        <div>
          <label>GBP : </label>
          <output>{gbp.toFixed(2)}€</output>
        </div>
        &nbsp;
        <div>
          <button>Caculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
