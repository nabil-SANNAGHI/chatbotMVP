import Chat from './components/Chat';
import ResponseManager from './components/ResponseManager';
import ErrorBoundary from './error/ErrorBoundary';

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Chat />
      </ErrorBoundary>
      <ErrorBoundary>
        <ResponseManager />
      </ErrorBoundary>
    </div>
  );
};

export default App;
