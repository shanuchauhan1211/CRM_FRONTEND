import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReminderSet = () => {
    const [reminderText, setReminderText] = useState('');
    const [reminderDateTime, setReminderDateTime] = useState('');
    const [reminders, setReminders] = useState([]);

    useEffect(() => {

        const interval= setInterval(async() => {
            try {
                const response = await axios.get('https://cr-mbackend-eosin.vercel.app/Addcon/getReminder');
                setReminders(response.data);
    
                // Display pop-ups for reminders matching the present date and time
                response.data.forEach(reminder => {
                    const reminderDateTime = new Date(reminder.dateTime);
                    const presentDateTime = new Date();
    
                    if (
                        reminderDateTime.getFullYear() === presentDateTime.getFullYear() &&
                        reminderDateTime.getMonth() === presentDateTime.getMonth() &&
                        reminderDateTime.getDate() === presentDateTime.getDate() &&
                        reminderDateTime.getHours() === presentDateTime.getHours() &&
                        reminderDateTime.getMinutes() === presentDateTime.getMinutes()
                    ) {
                        showAlert(reminder.text, reminderDateTime.toLocaleString());
                    }
                });
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
            }, 60000);
            
            // Cleanup function
            return () => {
                clearInterval(interval);
            };
        // fetchReminders();

        // // Set up WebSocket connection
        // const ws = new WebSocket('ws://localhost:8081');

        // // Handle WebSocket messages
        // ws.onmessage = function (event) {
        //     const reminder = JSON.parse(event.data);
        //     showAlert(reminder.text, new Date(reminder.dateTime).toLocaleString());
        // };

    },[] );

    const fetchReminders = async () => {
        try {
            const response = await axios.get('https://cr-mbackend-eosin.vercel.app/Addcon/getReminder');
            setReminders(response.data);

            // Display pop-ups for reminders matching the present date and time
            response.data.forEach(reminder => {
                const reminderDateTime = new Date(reminder.dateTime);
                const presentDateTime = new Date();

                if (
                    reminderDateTime.getFullYear() === presentDateTime.getFullYear() &&
                    reminderDateTime.getMonth() === presentDateTime.getMonth() &&
                    reminderDateTime.getDate() === presentDateTime.getDate() &&
                    reminderDateTime.getHours() === presentDateTime.getHours() &&
                    reminderDateTime.getMinutes() === presentDateTime.getMinutes()
                ) {
                    showAlert(reminder.text, reminderDateTime.toLocaleString());
                }
            });
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    const showAlert = (text, dateTime) => {
        alert(`Reminder: ${text} - Time: ${dateTime}`);
    };
    // const handleAddReminder = async () => {
    //     try {
    //         if (reminderText.trim() !== '' && reminderDateTime.trim() !== '') {
    //             await axios.post('https://cr-mbackend-eosin.vercel.app/reminder/reminder', { text: reminderText, dateTime: reminderDateTime });
    //             fetchReminders();
    //             setReminderText('');
    //             setReminderDateTime('');
    //         }
    //     } catch (error) {
    //         console.error('Error adding reminder:', error);
    //     }
    // };

    const handleDeleteReminder = async (id) => {
        try {
            await axios.delete(`https://cr-mbackend-eosin.vercel.app/Addcon/reminders/${id}`);
            fetchReminders();
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Reminders</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="border rounded px-2 py-1 mr-2"
                    placeholder="Enter your reminder"
                    value={reminderText}
                    onChange={(e) => setReminderText(e.target.value)}
                />
                <input
                    type="datetime-local"
                    className="border rounded px-2 py-1 mr-2"
                    value={reminderDateTime}
                    onChange={(e) => setReminderDateTime(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddReminder}
                >
                    Add Reminder
                </button>
            </div>
            <ul>
                {reminders.map((reminder) => (
                    <li
                        key={reminder._id}
                        className="border rounded px-2 py-1 mb-2 flex justify-between items-center"
                    >
                        {reminder.text} - {new Date(reminder.dateTime).toLocaleString()}
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleDeleteReminder(reminder._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReminderSet;
