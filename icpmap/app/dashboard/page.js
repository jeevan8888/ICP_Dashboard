export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Dashboard</h1>
      <code>
        - TVL – Historical TVL data over time.  

        - Active Accounts – Daily active accounts interacting with the platform.  
        
        - Bridge Volume – Total bridge inflow/outflow for supported tokens (ETH, BTC).  


1. TVL Over Time (Line Chart)  
   - X-Axis: Date (daily, weekly, monthly).  
   - Y-Axis: TVL in USD.  
   - Chart Type: Line chart (Recharts, D3.js).  
   - API Endpoint: `/api/tvl?startDate=2021-01-01&endDate=2024-12-31`.  

2. Daily Active Accounts (Bar Chart)  
   - X-Axis: Date.  
   - Y-Axis: Number of Active Accounts.  
   - Chart Type: Bar chart (Recharts).  
   - API Endpoint: `/api/active-accounts?dateRange=last-30-days`.  

3. Bridge Volume (Flow Chart)  
   - X-Axis: Token Types (ETH, BTC).  
   - Y-Axis: Volume (USD).  
   - API Endpoint: `/api/bridge-volume?currency=ALL&dateRange=last-30-days`.  

</code>
    </div>
  );
}
