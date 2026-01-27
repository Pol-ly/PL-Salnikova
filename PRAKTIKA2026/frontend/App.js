import React, { useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import CustomerTable from './CustomerTable';
import LotTable from './LotTable';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <Theme preset={presetGpnDefault}>
      <div style={{ padding: 20, minHeight: '100vh' }}>
        
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          marginBottom: 24,
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: 16
        }}>
          <button
            onClick={() => setActiveTab('customers')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: activeTab === 'customers' ? '#0070f3' : 'transparent',
              color: activeTab === 'customers' ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Контрагенты
          </button>
          <button
            onClick={() => setActiveTab('lots')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: activeTab === 'lots' ? '#0070f3' : 'transparent',
              color: activeTab === 'lots' ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Лоты
          </button>
        </div>

        {activeTab === 'customers' ? <CustomerTable /> : <LotTable />}

      </div>
    </Theme>
  );
}

export default App;
