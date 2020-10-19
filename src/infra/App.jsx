import React, {useState, useEffect} from 'react';
import { History, createBrowserHistory } from 'history';
import routes from './routeToPageMapping';

const App = () => {
    const [currentLocation, setCurrentLocation] = useState(window.location);
    const [history] = useState(() => {
        const h = createBrowserHistory();
        h.listen(({location}) => {
            setCurrentLocation(location);
        })
        return h
    });

    const ComponentForRoute = React.lazy(() => importComponentForRoute(location.pathname));

    return <section>
        <span>Path: {currentLocation.pathname}</span>
        <React.Suspense fallback={<div>Loading...</div>}>
            <ComponentForRoute/>
        </React.Suspense>
    </section>
}

const importComponentForRoute = async (route) => {
    const {moduleName, page} = routes[route];
    await injectRemoteEntry();
    const factory = await window[moduleName].get(`pages/${page}`);
    const Component = await factory();

    return Component;
}

const injectRemoteEntry = (moduleName, pageName) => {
    return new Promise((resolve) => {
      if (window[moduleName]) {
        resolve(true);
        return;
      }
  
      const remoteEntryScript = document.createElement('script');
      remoteEntryScript.src = encodeURI('/app/remoteEntry.js');
      remoteEntryScript.async = true;
  
      remoteEntryScript.onload = () => {
        resolve(true);
      };
  
      remoteEntryScript.onerror = () => {
      };
  
      document.head.appendChild(remoteEntryScript);
    });
  };

export default App;