import React, { useEffect, useState } from 'react';
import FeatureToggle from './components/FeatureToggle.jsx';
import './App.css';

// Main application component for the feature toggle demo.
// It loads a feature configuration asynchronously and provides
// a current user to the FeatureToggle component.
function App() {
  const [config, setConfig] = useState(null);
  const currentUser = 'user1@example.com'; // simulate logged-in user

  // Simulate fetching a feature configuration from an API.
  useEffect(() => {
    const fetchConfig = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            newUI: { type: 'boolean', enabled: true },
            betaFeature: { type: 'percentage', percentage: 50 },
            specialFeature: { type: 'user', users: ['user1@example.com', 'user2@example.com'] },
          });
        }, 500);
      });
    fetchConfig().then((data) => setConfig(data));
  }, []);

  if (!config) {
    return <div className="app">Loading feature config...</div>;
  }

  return (
    <div className="app">
      <h1>Feature Toggle Demo</h1>
      <FeatureToggle config={config} currentUser={currentUser}>
        {({ features }) => (
          <div>
            {features.newUI && <p>The New UI is enabled!</p>}
            {features.betaFeature && <p>The Beta feature is active for you.</p>}
            {features.specialFeature && <p>You have access to the special feature.</p>}
          </div>
        )}
      </FeatureToggle>
    </div>
  );
}

export default App;
