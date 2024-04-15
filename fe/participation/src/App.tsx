import { Routes, Route } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';
import { Meetings } from './components/meetings/Meetings';
import { Meeting } from './components/meeting/Meeting';
import './App.css';
import { useEffect } from 'react';

export default function App() {
  // FAKE LOG IN
  useEffect(() => {
    const authUserName = window.localStorage.getItem('authUserName');
    if (!authUserName) {
      const inputUserName = () => {
        const userName = prompt('Enter your authenticated user name');
        if (userName) {
          window.localStorage.setItem('authUserName', userName);
        } else {
          inputUserName();
        }
      };
      inputUserName();
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route index element={<Meetings />} />

        <Route path="meeting/:id" element={<Meeting />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
