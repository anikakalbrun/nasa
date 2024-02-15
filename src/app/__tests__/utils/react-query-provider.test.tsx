import { render, screen } from '@testing-library/react';
import React from 'react';
import { useQuery, QueryFunction, QueryKey } from '@tanstack/react-query';

import ReactQueryProvider from '@/app/utils/react-query-provider';

interface TestData {
  data: string;
}

// Assuming fetchTestData is defined correctly
const fetchTestData: QueryFunction<TestData, QueryKey> = async ({ queryKey }) => {
  const [_key] = queryKey;
  // Simulated data fetch
  return { data: 'Test data' }; 
};

function TestComponent() {
  const { data, isLoading } = useQuery<TestData, Error>({
    queryKey: ['test'],
    queryFn: fetchTestData
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.data}</div>;
}

describe('ReactQueryProvider', () => {
  test('provides React Query context to its children', async () => {
    render(
      <ReactQueryProvider>
        <TestComponent />
      </ReactQueryProvider>
    );

    // Initially, the test component should show the loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the query to resolve and check if the data is rendered
    const resolvedData = await screen.findByText('Test data');
    expect(resolvedData).toBeInTheDocument();
  });
});
