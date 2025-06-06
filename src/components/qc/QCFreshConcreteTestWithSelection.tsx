
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PieceSelection from './PieceSelection';

interface QCFreshConcreteTestWithSelectionProps {
  departmentName: string;
  scheduledPieces: { [formName: string]: Array<{ id: string; name: string }> };
}

const QCFreshConcreteTestWithSelection: React.FC<QCFreshConcreteTestWithSelectionProps> = ({
  departmentName,
  scheduledPieces
}) => {
  const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set());

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Fresh Concrete Test - {departmentName}</CardTitle>
            <CardDescription>Record fresh concrete test data for {departmentName.toLowerCase()} production</CardDescription>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/templates/fresh-concrete-test">
              <Plus className="h-4 w-4 mr-2" />
              New Test Record
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="test-date">Test Date</Label>
            <Input id="test-date" type="date" />
          </div>
          <div>
            <Label htmlFor="test-time">Test Time</Label>
            <Input id="test-time" type="time" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mix-design">Mix Design</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mix design" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MD-001">MD-001 - Standard {departmentName} Mix</SelectItem>
                <SelectItem value="MD-002">MD-002 - High Strength Precast</SelectItem>
                <SelectItem value="MD-003">MD-003 - Extruded Products</SelectItem>
                <SelectItem value="MD-004">MD-004 - Flexicore Mix</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="batch-ticket">Batch Ticket</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select batch ticket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BT-2024-0115-001">BT-2024-0115-001 - MD-001 - 3.5 yd³</SelectItem>
                <SelectItem value="BT-2024-0115-002">BT-2024-0115-002 - MD-002 - 5.0 yd³</SelectItem>
                <SelectItem value="BT-2024-0115-003">BT-2024-0115-003 - MD-003 - 2.8 yd³</SelectItem>
                <SelectItem value="BT-2024-0115-004">BT-2024-0115-004 - MD-004 - 4.2 yd³</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <PieceSelection 
          scheduledPieces={scheduledPieces}
          selectedPieces={selectedPieces}
          onSelectionChange={setSelectedPieces}
        />

        {/* Fresh Concrete Test Results */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Fresh Concrete Test Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="slump-flow">Slump/Slump Flow (inches)</Label>
              <Input id="slump-flow" type="number" step="0.1" placeholder="5.5" />
            </div>
            <div>
              <Label htmlFor="air-content">Air Content (%)</Label>
              <Input id="air-content" type="number" step="0.1" placeholder="6.2" />
            </div>
            <div>
              <Label htmlFor="ambient-temperature">Ambient Temperature (°F)</Label>
              <Input id="ambient-temperature" type="number" placeholder="72" />
            </div>
            <div>
              <Label htmlFor="concrete-temperature">Concrete Temperature (°F)</Label>
              <Input id="concrete-temperature" type="number" placeholder="68" />
            </div>
            <div>
              <Label htmlFor="unit-weight">Unit Weight (lb/ft³)</Label>
              <Input id="unit-weight" type="number" step="0.1" placeholder="145.2" />
            </div>
            <div>
              <Label htmlFor="yield">Yield (ft³/yd³)</Label>
              <Input id="yield" type="number" step="0.1" placeholder="27.0" disabled className="bg-gray-100" />
              <p className="text-xs text-gray-500 mt-1">Auto-populated from batch ticket</p>
            </div>
            <div>
              <Label htmlFor="relative-yield">Relative Yield</Label>
              <Input id="relative-yield" type="number" step="0.01" placeholder="1.00" disabled className="bg-gray-100" />
              <p className="text-xs text-gray-500 mt-1">Auto-calculated (actual ÷ target)</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h5 className="font-medium mb-3">Additional Specifications</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="t20">T-20 (seconds)</Label>
                <Input id="t20" type="number" step="0.1" placeholder="12.5" />
              </div>
              <div>
                <Label htmlFor="j-ring">J-Ring</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="static-segregation">Static Segregation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <Label htmlFor="notes">Notes and Observations</Label>
          <Textarea 
            id="notes" 
            placeholder="Enter any observations, non-conformances, or additional notes..."
            rows={3}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Draft</Badge>
            <span className="text-sm text-gray-500">Form Status</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit for Review</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QCFreshConcreteTestWithSelection;
