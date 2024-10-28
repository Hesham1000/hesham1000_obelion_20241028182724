import React from 'react';
import AccountCreation from './AccountCreation';
import Login from './Login';
import TaskCreation from './TaskCreation';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager</h1>
      </header>
      <main>
        <AccountCreation />
        <Login />
        <TaskCreation />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
