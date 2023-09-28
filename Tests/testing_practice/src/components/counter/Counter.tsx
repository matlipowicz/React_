import { MouseEventHandler, useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <input type="number" name="amount" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
            <button onClick={() => setCount(amount)}>Set</button>
        </div>
    );
};
