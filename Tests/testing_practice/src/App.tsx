import { Application } from "./components/application/Application";
import { AppProviders } from "./providers/AppProviders";
import "./App.css";

function App() {
    return (
        <AppProviders>
            <Application />
        </AppProviders>
    );
}

export default App;
