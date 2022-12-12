import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
// import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
// import { reactPlugin } from './AppInsights';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import 'mapbox-gl/dist/mapbox-gl.css';

import { store } from './store';
import { AppRoutes } from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                {/* <AppInsightsErrorBoundary 
                    onError={() => console.log('AppInsights: Something went wrong')} 
                    appInsights={reactPlugin}
                > */}
                <AppRoutes />
                {/* </AppInsightsErrorBoundary> */}
            </StyledEngineProvider>
        </Provider>
    </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
