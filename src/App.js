import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/Home';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <Home />
      </HealthKitProvider>
    </QueryClientProvider>
  );
};