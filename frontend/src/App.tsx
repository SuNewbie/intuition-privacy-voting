import { useState } from 'react';

function App() {
  const [option, setOption] = useState(0);

  const vote = async () => {
    alert(`Pretend to vote for option ${option}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Intuition Privacy Voting</h1>
      <select value={option} onChange={e => setOption(Number(e.target.value))}>
        <option value={0}>Option 0</option>
        <option value={1}>Option 1</option>
      </select>
      <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={vote}>Vote</button>
    </div>
  );
}

export default App;
