
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mixDesigns, batchTickets } from './mockData';

interface BasicInformationSectionProps {
  testData: {
    date: string;
    time: string;
    mixDesign: string;
    batchTicket: string;
  };
  updateField: (field: string, value: string) => void;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  testData,
  updateField
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={testData.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={testData.time}
            onChange={(e) => updateField('time', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mixDesign">Mix Design</Label>
          <Select value={testData.mixDesign} onValueChange={(value) => updateField('mixDesign', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select mix design" />
            </SelectTrigger>
            <SelectContent>
              {mixDesigns.map((design) => (
                <SelectItem key={design.id} value={design.id}>
                  {design.id} - {design.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="batchTicket">Batch Ticket</Label>
          <Select value={testData.batchTicket} onValueChange={(value) => updateField('batchTicket', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select batch ticket" />
            </SelectTrigger>
            <SelectContent>
              {batchTickets
                .filter(batch => !testData.mixDesign || batch.mixDesign === testData.mixDesign)
                .map((batch) => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.id} (Yield: {batch.yield}, Size: {batch.batchSize})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
