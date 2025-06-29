import React, { useEffect, useState } from 'react';
import useAuthInfo from '../hooks/useAuthInfo';

const SoftDelete = () => {
  const { user } = useAuthInfo();
  const phone = user?.phone;

  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    if (phone) fetchDeletedMoods();
  }, [phone]);

  const fetchDeletedMoods = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/recycle-bin?phone=${phone}`);
      const data = await res.json();
      if (data.success) {
        setDeletedItems(data.entries);
      }
    } catch (err) {
      console.error('Failed to load recycle bin', err);
    }
  };

  const handleRestore = async (id) => {
    if (!window.confirm('Are you sure to restore this mood entry?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/restore-mood/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        alert('Mood restored!');
        fetchDeletedMoods();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Restore failed', err);
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm('⚠️ This will permanently delete the mood entry. Continue?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/permanent-delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        alert('Permanently deleted!');
        fetchDeletedMoods();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Permanent delete failed', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Recycle Bin - Soft Deleted Moods</h2>

      {deletedItems.length === 0 ? (
        <p className="text-center text-gray-600">No deleted mood entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Mood</th>
                <th className="px-4 py-2 border">Note</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedItems.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="px-4 py-2 border">{item.date}</td>
                  <td className="px-4 py-2 border">{item.mood}</td>
                  <td className="px-4 py-2 border">{item.note || '-'}</td>
                  <td className="px-4 py-2 border flex flex-col gap-1 items-center">
                    <button
                      className="bg-green-600  text-white px-3 py-1 rounded hover:bg-green-700 w-24"
                      onClick={() => handleRestore(item._id)}
                    >
                      Restore
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-24"
                      onClick={() => handlePermanentDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SoftDelete;
