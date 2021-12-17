import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Tasks = lazy(() => import('./tasks'));

function App() {
  return (
    <>
      <div>
        Header
      </div>
      <Suspense fallback="loading...">
        <Router>
          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/" strict exact>
              Other
              <Link to="/tasks">Tasks</Link>
            </Route>
            <Route>
              Not Found
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
