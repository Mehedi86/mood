import React, { useEffect, useState } from 'react';
import useAuthInfo from '../hooks/useAuthInfo';

const moods = ["Happy", "Sad", "Angry", "Excited"];

const Home = () => {
    const today = new Date().toISOString().split('T')[0];
    const { user } = useAuthInfo();
    const userPhone = user?.phone;

    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedMood, setSelectedMood] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!userPhone) return;
        checkMoodStatus();
    }, [userPhone, today]);

    const checkMoodStatus = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/mood-status?phone=${userPhone}&date=${today}`);
            const data = await res.json();
            if (data.exists) setSubmitted(true);
        } catch (err) {
            console.error('Error checking mood status:', err);
        }
    };

    const handleSubmit = async () => {
        if (!selectedMood) return alert("Please select a mood.");
        if (!userPhone) return alert("User not logged in.");

        const moodEntry = {
            phone: userPhone,
            date: today,
            mood: selectedMood,
            note,
        };

        try {
            const res = await fetch('http://localhost:5000/api/mood-entry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moodEntry),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Mood submission failed');

            setSubmitted(true);
            setShowModal(false);
            setSelectedMood('');
            setNote('');
            alert('Mood submitted successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 relative">
            {!user && (
                <div className="mb-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-center shadow-md max-w-xl">
                    <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🔒 Login Required</h2>
                    <p className="text-gray-700">
                        To <span className="font-medium text-teal-700">submit your mood</span> or
                        view your <span className="font-medium text-teal-700">daily statistics</span>, please log in.
                    </p>
                </div>
            )}

            <div className="absolute top-6 text-xl font-semibold">{today}</div>

            <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Mood Tracker</h1>

            <div className="mb-6 text-lg">
                {!submitted ? (
                    <span className="text-gray-700 italic">Today's mood not submitted yet...</span>
                ) : (
                    <div className="text-green-600 font-semibold text-center">
                        🎉 Congrats!<br />
                        <span className="text-gray-700">Mood already submitted for today.</span>
                    </div>
                )}
            </div>

            {!submitted && (
                <button
                    onClick={handleSubmit}
                    disabled={!user}
                    className={`btn text-black transition${!user
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    Submit
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Submit Today's Mood</h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {moods.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedMood(m)}
                                    className={`px-4 py-2 rounded border ${selectedMood === m ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <textarea
                            className="w-full border p-2 rounded mb-4"
                            rows="3"
                            placeholder="Optional note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
