import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Details from '../components/Layouts/Details';
import List from '../components/Layouts/List';

export function UniversalRouter(props) {
  if (process.env.BUILD_TARGET === 'client') {
    return (
      <ReactRouter.BrowserRouter>
        <ReactRouter.Switch>
          <ReactRouter.Route path='/' exact render={() => <List />} />
          <ReactRouter.Route path='/:id' render={() => <Details />} />
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
