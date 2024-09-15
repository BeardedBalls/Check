import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

// Define months for the selector
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ClientTable = ({ clients }) => {
  const [formData, setFormData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]); // Default to current month
  const [error, setError] = useState('');

  useEffect(() => {
    // Save clients to Firestore whenever `clients` or `selectedMonth` changes
    const saveClients = async () => {
      try {
        console.log('Saving clients for month:', selectedMonth);
        const monthPath = `Clients_${selectedMonth}`; // Build the path for the current month
        for (const client of clients) {
          const clientRef = doc(firestore, `clients/${monthPath}/Clients`, client.id);
          console.log('Saving client:', clientRef.id);
          await setDoc(clientRef, {
            meterNumber: client.meterNumber,
            lastName: client.lastName,
            firstName: client.firstName,
            previousReading: client.previousReading,
            latestReading: client.latestReading,
            cubic: client.cubic,
            amount: client.amount,
            arrears: client.arrears
          }, { merge: true }); // Use merge to update existing documents
        }
        console.log('Clients saved successfully');
      } catch (error) {
        console.error('Error saving clients:', error);
        setError('Failed to save clients');
      }
    };

    if (clients.length > 0) {
      saveClients();
    }
  }, [clients, selectedMonth]);

  const handleInputChange = (clientId, e) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData(prevFormData => ({
      ...prevFormData,
      [clientId]: {
        ...prevFormData[clientId],
        [name]: value
      }
    }));

    // Update the client object and save to Firestore
    const updatedClient = {
      ...clients.find(client => client.id === clientId),
      [name]: value
    };

    // Save the updated client data
    const saveClient = async () => {
      try {
        const clientRef = doc(firestore, `clients/Clients_${selectedMonth}/Clients`, clientId);
        await updateDoc(clientRef, updatedClient);
        console.log('Client updated successfully');
      } catch (error) {
        console.error('Error updating client:', error);
        setError('Failed to update client');
      }
    };

    saveClient();
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log('Selected month changed to:', e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="month-select">Select Month: </label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Meter No.</th>
            <th>Name</th>
            <th>Previous Reading</th>
            <th>Latest Reading</th>
            <th>Cubic</th>
            <th>Amount</th>
            <th>Arrears</th>
            <th>Update Reading</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.meterNumber}</td>
              <td>{client.lastName} {client.firstName}</td>
              <td>{client.previousReading || ''}</td>
              <td>{client.latestReading || ''}</td>
              <td>{client.cubic || ''}</td>
              <td>{client.amount || ''}</td>
              <td>{client.arrears || ''}</td>
              <td>
                <input
                  type="text"
                  name="latestReading"
                  value={formData[client.id]?.latestReading || client.latestReading || ''}
                  onChange={(e) => handleInputChange(client.id, e)}
                  placeholder="Enter new reading"
                />
                {/* Add other input fields for other fields if necessary */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ClientTable;
