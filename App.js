import { HealthKitProvider } from './Healthkit';
import Home from './Components/Home';

export default function App() {
  return (
    <HealthKitProvider>
      <Home />
    </HealthKitProvider>
  );
};
