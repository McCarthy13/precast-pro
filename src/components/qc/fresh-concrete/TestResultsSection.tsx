
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TestResultsSectionProps {
  testData: {
    slumpFlow: string;
    airContent: string;
    ambientTemp: string;
    concreteTemp: string;
    unitWeight: string;
    releaseRequired: string;
    strengthRequired: string;
    yield: string;
    relativeYield: string;
    t20: string;
    jRing: string;
    staticSegregation: string;
  };
  updateField: (field: string, value: string) => void;
}

const TestResultsSection: React.FC<TestResultsSectionProps> = ({
  testData,
  updateField
}) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Test Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slumpFlow">Slump Flow (in)</Label>
          <Input
            id="slumpFlow"
            type="number"
            step="0.25"
            value={testData.slumpFlow}
            onChange={(e) => updateField('slumpFlow', e.target.value)}
            placeholder="e.g., 5.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="airContent">Air Content (%)</Label>
          <Input
            id="airContent"
            type="number"
            step="0.1"
            value={testData.airContent}
            onChange={(e) => updateField('airContent', e.target.value)}
            placeholder="e.g., 6.2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ambientTemp">Ambient Temperature (°F)</Label>
          <Input
            id="ambientTemp"
            type="number"
            value={testData.ambientTemp}
            onChange={(e) => updateField('ambientTemp', e.target.value)}
            placeholder="e.g., 72"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="concreteTemp">Concrete Temperature (°F)</Label>
          <Input
            id="concreteTemp"
            type="number"
            value={testData.concreteTemp}
            onChange={(e) => updateField('concreteTemp', e.target.value)}
            placeholder="e.g., 68"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unitWeight">Unit Weight (lb/ft³)</Label>
          <Input
            id="unitWeight"
            type="number"
            step="0.1"
            value={testData.unitWeight}
            onChange={(e) => updateField('unitWeight', e.target.value)}
            placeholder="e.g., 145.2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseRequired">Release Required (psi)</Label>
          <Input
            id="releaseRequired"
            type="number"
            value={testData.releaseRequired}
            onChange={(e) => updateField('releaseRequired', e.target.value)}
            placeholder="e.g., 3500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strengthRequired">28-Day Strength Required (psi)</Label>
          <Input
            id="strengthRequired"
            type="number"
            value={testData.strengthRequired}
            onChange={(e) => updateField('strengthRequired', e.target.value)}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yield">Yield (ft³/yd³)</Label>
          <Input
            id="yield"
            type="number"
            step="0.1"
            value={testData.yield}
            onChange={(e) => updateField('yield', e.target.value)}
            placeholder="Auto-filled from batch"
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relativeYield">Relative Yield</Label>
          <Input
            id="relativeYield"
            type="number"
            step="0.001"
            value={testData.relativeYield}
            onChange={(e) => updateField('relativeYield', e.target.value)}
            placeholder="Auto-calculated"
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <h4 className="text-md font-medium mb-4">Additional Specifications:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="t20">T-20 (sec)</Label>
            <Input
              id="t20"
              type="number"
              step="0.1"
              value={testData.t20}
              onChange={(e) => updateField('t20', e.target.value)}
              placeholder="e.g., 12.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jRing">J-Ring</Label>
            <Select value={testData.jRing} onValueChange={(value) => updateField('jRing', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pass">Pass</SelectItem>
                <SelectItem value="Fail">Fail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staticSegregation">Static Segregation</Label>
            <Select value={testData.staticSegregation} onValueChange={(value) => updateField('staticSegregation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pass">Pass</SelectItem>
                <SelectItem value="Fail">Fail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsSection;
