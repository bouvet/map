import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const APPLICATIONINSIGHTS_CONNECTION_STRING = process.env.REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING;

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString: APPLICATIONINSIGHTS_CONNECTION_STRING,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin],
    },
});
appInsights.loadAppInsights();

export { reactPlugin, appInsights };
