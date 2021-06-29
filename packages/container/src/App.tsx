
//@ts-ignore
// import Button from 'app1/Button';
import { Suspense, lazy } from 'react';

const App1Button = lazy(
  //@ts-ignore
  () => import('app1/Button')
);

const App2Hello = lazy(
  //@ts-ignore
  () => import('app2/Hello')
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
          App container
      </header>
      <Suspense fallback="Loading button...">
        <App1Button />
        <App2Hello />
      </Suspense>
      {/* <Suspense fallback="Loading hello...">
        <App2Hello />
      </Suspense> */}
    </div>
  );
}

export default App;
