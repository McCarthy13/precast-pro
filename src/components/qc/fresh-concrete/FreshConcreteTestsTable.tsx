import React from 'react';

interface FreshConcreteTestsTableProps {
  tests: any[];
  columns: any[];
  strengthData: Record<string, any>;
  updateStrengthData: (testId: string, field: string, value: string) => void;
  calculateAverage: (testId: string) => string;
}

const FreshConcreteTestsTable: React.FC<FreshConcreteTestsTableProps> = ({
  tests,
  columns,
  strengthData,
  updateStrengthData,
  calculateAverage
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th key={column.key} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                {column.label}
              </th>
            ))}
            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Strength 1 (psi)</th>
            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Strength 2 (psi)</th>
            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Strength 3 (psi)</th>
            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">28-Day Average (psi)</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id} id={`test-row-${test.id}`} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="border border-gray-300 px-3 py-2 text-sm">
                  {test[column.key as keyof typeof test] || '-'}
                </td>
              ))}
              <td className="border border-gray-300 px-3 py-2 text-sm">
                <input
                  type="number"
                  placeholder="Enter"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  value={strengthData[test.id]?.strength1 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm">
                <input
                  type="number"
                  placeholder="Enter"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  value={strengthData[test.id]?.strength2 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm">
                <input
                  type="number"
                  placeholder="Enter"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  value={strengthData[test.id]?.strength3 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength3', e.target.value)}
                />
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
                {calculateAverage(test.id) || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreshConcreteTestsTable;
