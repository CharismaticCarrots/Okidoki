import { HealthKitProvider } from './Healthkit';
import Steps from './Components/Steps';

export default function App() {
  return (
    <HealthKitProvider>
      <Steps />
    </HealthKitProvider>
  );
}
