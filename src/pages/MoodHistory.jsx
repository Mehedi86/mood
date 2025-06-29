import React, { useEffect, useState } from 'react';
import useAuthInfo from '../hooks/useAuthInfo';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MoodHistory = () => {
  const { user } = useAuthInfo();
  const phone = user?.phone;

  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    if (phone) fetchMoods();
  }, [phone]);

  const fetchMoods = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/mood-history?phone=${phone}`);
      const data = await res.json();
      if (data.success) {
        const sorted = data.entries
          .filter(entry => !entry.deleted)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(sorted);
        setFiltered(sorted);
      }
    } catch (err) {
      console.error('Failed to load mood history', err);
    }
  };

  const handleFilter = () => {
    const start = new Date(from);
    const end = new Date(to);
    const filteredData = entries.filter(entry => {
      const date = new Date(entry.date);
      return date >= start && date <= end;
    });
    setFiltered(filteredData);
  };

  const getWeekData = () => {
    const weekMoods = { Happy: 0, Sad: 0, Angry: 0, Excited: 0 };
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      if (entryDate >= sevenDaysAgo) {
        if (weekMoods[entry.mood] !== undefined) {
          weekMoods[entry.mood]++;
        }
      }
    });

    return {
      labels: Object.keys(weekMoods),
      datasets: [
        {
          label: 'Last 7 Days Mood Summary',
          data: Object.values(weekMoods),
          backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#2196F3'],
        }
      ]
    };
  };

  const handleEdit = (entry) => {
    alert(`Edit mood for ${entry.date}`);
    // Add your edit logic here
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this mood?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/mood-delete/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        alert('Deleted!');
        fetchMoods();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Mood History</h2>

      <div className="mb-4 flex flex-wrap items-center gap-4 justify-center">
        <div>
          <label className="block font-medium mb-1">From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border px-2 py-1 rounded" />
        </div>
        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded mt-6">Apply Filter</button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Mood</th>
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(entry => (
              <tr key={entry._id} className="text-center">
                <td className="px-4 py-2 border">{entry.date}</td>
                <td className="px-4 py-2 border">{entry.mood}</td>
                <td className="px-4 py-2 border">{entry.note || '-'}</td>
                <td className="px-4 py-2 border">
                  <button className=" bg-teal-600 btn mr-2" onClick={() => handleEdit(entry)}>Edit</button>
                  <button className="text-red-600 btn" onClick={() => handleDelete(entry._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-center">Weekly Mood Summary</h3>
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <Bar data={getWeekData()} />
      </div>
    </div>
  );
};

export default MoodHistory;
