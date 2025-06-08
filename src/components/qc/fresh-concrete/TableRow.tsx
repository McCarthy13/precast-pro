
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CheckCircle } from "lucide-react";
import { HierarchyGroup, columnWidths } from './types';
import { formatDate, getReleaseColor, getAverageColor, getPassFailColor } from './utils';

interface FreshConcreteTableRowProps {
  group: HierarchyGroup;
  strengthData: Record<string, any>;
  handleTestDataUpdate: (testId: string, field: string, value: string) => void;
  handleStrengthDataUpdate: (testId: string, field: string, value: string) => void;
  calculateAverage: (testId: string) => string;
  getFieldValue: (test: any, field: string) => string;
  isReleaseSubmitted: (testId: string) => boolean;
  is28DaySubmitted: (testId: string) => boolean;
  isReleaseComplete: (testId: string) => boolean;
  is28DayComplete: (testId: string) => boolean;
  handleSubmitRelease: (testId: string) => void;
  handleSubmit28Day: (testId: string) => void;
}

const FreshConcreteTableRow = ({
  group,
  strengthData,
  handleTestDataUpdate,
  handleStrengthDataUpdate,
  calculateAverage,
  getFieldValue,
  isReleaseSubmitted,
  is28DaySubmitted,
  isReleaseComplete,
  is28DayComplete,
  handleSubmitRelease,
  handleSubmit28Day
}: FreshConcreteTableRowProps) => {
  const { mainTest, hierarchy } = group;

  return (
    <TableRow 
      key={mainTest.id} 
      id={`test-row-${mainTest.id}`}
      className={`
        ${(isReleaseSubmitted(mainTest.id) && is28DaySubmitted(mainTest.id)) ? 'bg-green-50' : ''}
      `}
    >
      {/* Single-line columns: Date, Time, Mix ID, Batch # */}
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.date}px`, minWidth: `${columnWidths.date}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent w-full"
          value={formatDate(getFieldValue(mainTest, 'date'))}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'date', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.time}px`, minWidth: `${columnWidths.time}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent w-full"
          value={getFieldValue(mainTest, 'time')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'time', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.mixDesign}px`, minWidth: `${columnWidths.mixDesign}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent w-full"
          value={getFieldValue(mainTest, 'mixDesign')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'mixDesign', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.batchTicket}px`, minWidth: `${columnWidths.batchTicket}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent w-full"
          value={getFieldValue(mainTest, 'batchTicket')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'batchTicket', e.target.value)}
        />
      </TableCell>

      {/* Christmas tree columns: Form, Job, Pieces */}
      <TableCell className="px-1 py-1" style={{width: `${columnWidths.form}px`, minWidth: `${columnWidths.form}px`}}>
        <div className="text-xs px-1 space-y-0.5">
          {hierarchy.map((formGroup, formIndex) => {
            const formRowSpan = formGroup.jobs.reduce((sum, jobGroup) => sum + Math.max(1, jobGroup.pieces.length), 0);
            return (
              <div key={formIndex} className="font-medium text-center bg-gray-50 rounded border flex items-center justify-center" style={{ minHeight: `${formRowSpan * 1.5}rem` }}>
                {formGroup.form}
              </div>
            );
          })}
        </div>
      </TableCell>
      
      <TableCell className="px-1 py-1" style={{width: `${columnWidths.job}px`, minWidth: `${columnWidths.job}px`}}>
        <div className="text-xs px-1 space-y-0.5">
          {hierarchy.map((formGroup, formIndex) => (
            <div key={formIndex} className="space-y-0.5">
              {formGroup.jobs.map((jobGroup, jobIndex) => {
                const jobRowSpan = Math.max(1, jobGroup.pieces.length);
                return (
                  <div key={jobIndex} className="font-medium flex items-center" style={{ minHeight: `${jobRowSpan * 1.5}rem` }}>
                    {jobGroup.job}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </TableCell>

      <TableCell className="px-1 py-1" style={{width: `${columnWidths.pieces}px`, minWidth: `${columnWidths.pieces}px`}}>
        <div className="text-xs px-1 space-y-0.5">
          {hierarchy.map((formGroup, formIndex) => (
            <div key={formIndex} className="space-y-0.5">
              {formGroup.jobs.map((jobGroup, jobIndex) => (
                <div key={jobIndex} className="space-y-0.5">
                  {jobGroup.pieces.length > 0 ? (
                    jobGroup.pieces.map((pieceGroup, pieceIndex) => (
                      <div key={pieceIndex} className="min-h-6 flex items-center">
                        {pieceGroup}
                      </div>
                    ))
                  ) : (
                    <div className="min-h-6 flex items-center">--</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </TableCell>
      
      {/* Remaining test data columns: slumpFlow through relativeYield */}
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.slumpFlow}px`, minWidth: `${columnWidths.slumpFlow}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'slumpFlow')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'slumpFlow', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.airContent}px`, minWidth: `${columnWidths.airContent}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'airContent')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'airContent', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.ambientTemp}px`, minWidth: `${columnWidths.ambientTemp}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'ambientTemp')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'ambientTemp', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.concreteTemp}px`, minWidth: `${columnWidths.concreteTemp}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'concreteTemp')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'concreteTemp', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.unitWeight}px`, minWidth: `${columnWidths.unitWeight}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'unitWeight')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'unitWeight', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.yield}px`, minWidth: `${columnWidths.yield}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'yield')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'yield', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.relativeYield}px`, minWidth: `${columnWidths.relativeYield}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'relativeYield')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'relativeYield', e.target.value)}
        />
      </TableCell>

      {/* Release Results */}
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.release}px`, minWidth: `${columnWidths.release}px`}}>
        <Input
          className={`text-xs px-1 text-center w-full ${getReleaseColor(strengthData, mainTest.id, getFieldValue(mainTest, 'releaseRequired'))}`}
          placeholder="5171"
          value={strengthData[mainTest.id]?.release || ''}
          disabled={isReleaseSubmitted(mainTest.id)}
          onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'release', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseRequired}px`, minWidth: `${columnWidths.releaseRequired}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'releaseRequired')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'releaseRequired', e.target.value)}
          placeholder="3500"
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit}px`, minWidth: `${columnWidths.releaseSubmit}px`}}>
        {isReleaseSubmitted(mainTest.id) ? (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0 h-6 w-full justify-center">
            <CheckCircle className="h-2 w-2" />
            Done
          </Badge>
        ) : (
          <Button
            size="sm"
            className="h-6 text-xs px-2 w-full"
            disabled={!isReleaseComplete(mainTest.id)}
            onClick={() => handleSubmitRelease(mainTest.id)}
          >
            Submit
          </Button>
        )}
      </TableCell>

      {/* 28-Day Strength Results */}
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength1}px`, minWidth: `${columnWidths.strength1}px`}}>
        <Input
          className="text-xs text-center px-1 w-full"
          placeholder="8674"
          value={strengthData[mainTest.id]?.strength1 || ''}
          disabled={is28DaySubmitted(mainTest.id)}
          maxLength={5}
          onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength1', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength2}px`, minWidth: `${columnWidths.strength2}px`}}>
        <Input
          className="text-xs text-center px-1 w-full"
          placeholder="8491"
          value={strengthData[mainTest.id]?.strength2 || ''}
          disabled={is28DaySubmitted(mainTest.id)}
          maxLength={5}
          onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength2', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength3}px`, minWidth: `${columnWidths.strength3}px`}}>
        <Input
          className="text-xs text-center px-1 w-full"
          placeholder="8532"
          value={strengthData[mainTest.id]?.strength3 || ''}
          disabled={is28DaySubmitted(mainTest.id)}
          maxLength={5}
          onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength3', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.average}px`, minWidth: `${columnWidths.average}px`}}>
        <div className={`h-6 flex items-center justify-center text-sm font-medium bg-gray-50 rounded border px-1 w-full ${getAverageColor(calculateAverage, mainTest.id, getFieldValue(mainTest, 'strengthRequired'))}`}>
          {calculateAverage(mainTest.id) || '--'}
        </div>
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthRequired}px`, minWidth: `${columnWidths.strengthRequired}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 'strengthRequired')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'strengthRequired', e.target.value)}
          placeholder="5000"
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit}px`, minWidth: `${columnWidths.strengthSubmit}px`}}>
        {is28DaySubmitted(mainTest.id) ? (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0 h-6 w-full justify-center">
            <CheckCircle className="h-2 w-2" />
            Done
          </Badge>
        ) : (
          <Button
            size="sm"
            className="h-6 text-xs px-2 w-full"
            disabled={!is28DayComplete(mainTest.id)}
            onClick={() => handleSubmit28Day(mainTest.id)}
          >
            Submit
          </Button>
        )}
      </TableCell>

      {/* Additional Specifications */}
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.t20}px`, minWidth: `${columnWidths.t20}px`}}>
        <Input
          className="text-xs px-1 border-none bg-transparent text-center w-full"
          value={getFieldValue(mainTest, 't20')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 't20', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.jRing}px`, minWidth: `${columnWidths.jRing}px`}}>
        <Input
          className={`text-xs px-1 border-none bg-transparent w-full ${getPassFailColor(getFieldValue(mainTest, 'jRing'))}`}
          value={getFieldValue(mainTest, 'jRing')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'jRing', e.target.value)}
        />
      </TableCell>
      <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.staticSegregation}px`, minWidth: `${columnWidths.staticSegregation}px`}}>
        <Input
          className={`text-xs px-1 border-none bg-transparent w-full ${getPassFailColor(getFieldValue(mainTest, 'staticSegregation'))}`}
          value={getFieldValue(mainTest, 'staticSegregation')}
          onChange={(e) => handleTestDataUpdate(mainTest.id, 'staticSegregation', e.target.value)}
        />
      </TableCell>
    </TableRow>
  );
};

export default FreshConcreteTableRow;
