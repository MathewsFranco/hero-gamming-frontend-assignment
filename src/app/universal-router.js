import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import List from '../components/Layouts/List';
import StopWatches from '../components/Layouts/StopWatch';

export function UniversalRouter(props) {
  if (process.env.BUILD_TARGET === 'client') {
    return (
      <ReactRouter.BrowserRouter>
        <ReactRouter.Switch>
          <ReactRouter.Route path='/' exact render={() => <List />} />
          <ReactRouter.Route path='/:id' render={() => <StopWatches />} />
        </ReactRouter.Switch>
      </ReactRouter.BrowserRouter>
    );
  }

  return (
    <ReactRouter.StaticRouter location={props.location}>
      {props.children}
    </ReactRouter.StaticRouter>
  );
}
