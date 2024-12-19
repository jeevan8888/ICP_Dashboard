import tvlData from "@/data/tvlData"

export async function getServerSideProps () {
  console.log("Loaded TVL Data:", tvlData); // Debugging
  return {
    props: {
      data: tvlData,
    },
  };
}

const TVLPage = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">TVL - Historical Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">TVL (USD)</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.timestamp} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${entry.tvl.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{entry.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TVLPage;
