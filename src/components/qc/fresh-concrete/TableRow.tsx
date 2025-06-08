
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HierarchyGroup, columnWidths } from './types';
import { formatDate, formatPieces, getReleaseColor, getAverageColor, getPassFailColor } from './utils';

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

const FreshConcreteTableRow: React.FC<FreshConcreteTableRowProps> = ({
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
}) => {
  const { mainTest, hierarchy } = group;

  // Calculate total number of rows needed for this group
  const totalRows = hierarchy.reduce((total, formGroup) => 
    total + formGroup.jobs.reduce((jobTotal, jobGroup) => 
      jobTotal + Math.max(1, jobGroup.pieces.length), 0), 0);

  let currentRow = 0;

  return (
    <>
      {hierarchy.map((formGroup, formIndex) => 
        formGroup.jobs.map((jobGroup, jobIndex) => {
          const pieceRows = Math.max(1, jobGroup.pieces.length);
          
          return Array.from({ length: pieceRows }, (_, pieceIndex) => {
            const isFirstRowOfGroup = currentRow === 0;
            const isFirstRowOfForm = formIndex === 0 && jobIndex === 0 && pieceIndex === 0;
            const isFirstRowOfJob = jobIndex === 0 && pieceIndex === 0;
            const piece = jobGroup.pieces[pieceIndex] || '';
            
            // Create a unique key for this form to store separate release data
            const formReleaseKey = `${mainTest.id}_${formGroup.form}`;
            
            const rowElement = (
              <TableRow key={`${mainTest.id}-${formIndex}-${jobIndex}-${pieceIndex}`} id={`test-row-${mainTest.id}`}>
                {/* Date - only show on first row */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.date}px`, minWidth: `${columnWidths.date}px`}}
                  rowSpan={isFirstRowOfGroup ? totalRows : undefined}
                >
                  {isFirstRowOfGroup ? formatDate(mainTest.date) : ''}
                </TableCell>

                {/* Time - only show on first row */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.time}px`, minWidth: `${columnWidths.time}px`}}
                  rowSpan={isFirstRowOfGroup ? totalRows : undefined}
                >
                  {isFirstRowOfGroup ? mainTest.time : ''}
                </TableCell>

                {/* Mix Design - only show on first row */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.mixDesign}px`, minWidth: `${columnWidths.mixDesign}px`}}
                  rowSpan={isFirstRowOfGroup ? totalRows : undefined}
                >
                  {isFirstRowOfGroup ? mainTest.mixDesign : ''}
                </TableCell>

                {/* Batch Ticket - only show on first row */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.batchTicket}px`, minWidth: `${columnWidths.batchTicket}px`}}
                  rowSpan={isFirstRowOfGroup ? totalRows : undefined}
                >
                  {isFirstRowOfGroup ? mainTest.batchTicket : ''}
                </TableCell>

                {/* Form - show on first row of each form */}
                <TableCell 
                  className="px-2 py-1 text-xs font-medium border-r border-gray-200" 
                  style={{width: `${columnWidths.form}px`, minWidth: `${columnWidths.form}px`}}
                  rowSpan={isFirstRowOfJob ? pieceRows * formGroup.jobs.length : undefined}
                >
                  {isFirstRowOfJob ? formGroup.form : ''}
                </TableCell>

                {/* Job - show on first row of each job */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.job}px`, minWidth: `${columnWidths.job}px`}}
                  rowSpan={pieceIndex === 0 ? pieceRows : undefined}
                >
                  {pieceIndex === 0 ? jobGroup.job : ''}
                </TableCell>

                {/* Pieces - show individual pieces */}
                <TableCell 
                  className="px-2 py-1 text-xs border-r border-gray-200" 
                  style={{width: `${columnWidths.pieces}px`, minWidth: `${columnWidths.pieces}px`}}
                >
                  {piece}
                </TableCell>

                {/* Test Results - only show on first row */}
                {isFirstRowOfGroup && (
                  <>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.slumpFlow}px`, minWidth: `${columnWidths.slumpFlow}px`}} rowSpan={totalRows}>{mainTest.slumpFlow}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.airContent}px`, minWidth: `${columnWidths.airContent}px`}} rowSpan={totalRows}>{mainTest.airContent}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.ambientTemp}px`, minWidth: `${columnWidths.ambientTemp}px`}} rowSpan={totalRows}>{mainTest.ambientTemp}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.concreteTemp}px`, minWidth: `${columnWidths.concreteTemp}px`}} rowSpan={totalRows}>{mainTest.concreteTemp}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.unitWeight}px`, minWidth: `${columnWidths.unitWeight}px`}} rowSpan={totalRows}>{mainTest.unitWeight}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.yield}px`, minWidth: `${columnWidths.yield}px`}} rowSpan={totalRows}>{mainTest.yield}</TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.relativeYield}px`, minWidth: `${columnWidths.relativeYield}px`}} rowSpan={totalRows}>{mainTest.relativeYield}</TableCell>
                  </>
                )}

                {/* Release Results - separate for each form */}
                {isFirstRowOfJob && (
                  <>
                    <TableCell 
                      className="px-1 py-1 border-r border-gray-200" 
                      style={{width: `${columnWidths.release}px`, minWidth: `${columnWidths.release}px`}}
                      rowSpan={pieceRows * formGroup.jobs.length}
                    >
                      <Input
                        type="text"
                        value={strengthData[formReleaseKey]?.release || ''}
                        onChange={(e) => handleStrengthDataUpdate(formReleaseKey, 'release', e.target.value)}
                        placeholder="0000"
                        className={`h-6 text-xs text-center ${getReleaseColor(strengthData, formReleaseKey, mainTest.releaseRequired)}`}
                        disabled={isReleaseSubmitted(formReleaseKey)}
                      />
                    </TableCell>
                    <TableCell 
                      className="px-2 py-1 text-xs border-r border-gray-200" 
                      style={{width: `${columnWidths.releaseRequired}px`, minWidth: `${columnWidths.releaseRequired}px`}}
                      rowSpan={pieceRows * formGroup.jobs.length}
                    >
                      {mainTest.releaseRequired}
                    </TableCell>
                    <TableCell 
                      className="px-1 py-1 border-r border-gray-200" 
                      style={{width: `${columnWidths.releaseSubmit}px`, minWidth: `${columnWidths.releaseSubmit}px`}}
                      rowSpan={pieceRows * formGroup.jobs.length}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubmitRelease(formReleaseKey)}
                        disabled={!isReleaseComplete(formReleaseKey) || isReleaseSubmitted(formReleaseKey)}
                        className="h-6 text-xs px-2"
                      >
                        {isReleaseSubmitted(formReleaseKey) ? 'Submitted' : 'Submit'}
                      </Button>
                    </TableCell>
                  </>
                )}

                {/* 28-Day Strength Results - shared across all forms (only show on first row) */}
                {isFirstRowOfGroup && (
                  <>
                    <TableCell className="px-1 py-1 border-r border-gray-200" style={{width: `${columnWidths.strength1}px`, minWidth: `${columnWidths.strength1}px`}} rowSpan={totalRows}>
                      <Input
                        type="number"
                        value={strengthData[mainTest.id]?.strength1 || ''}
                        onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength1', e.target.value)}
                        placeholder="0000"
                        className="h-6 text-xs text-center"
                        disabled={is28DaySubmitted(mainTest.id)}
                      />
                    </TableCell>
                    <TableCell className="px-1 py-1 border-r border-gray-200" style={{width: `${columnWidths.strength2}px`, minWidth: `${columnWidths.strength2}px`}} rowSpan={totalRows}>
                      <Input
                        type="number"
                        value={strengthData[mainTest.id]?.strength2 || ''}
                        onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength2', e.target.value)}
                        placeholder="0000"
                        className="h-6 text-xs text-center"
                        disabled={is28DaySubmitted(mainTest.id)}
                      />
                    </TableCell>
                    <TableCell className="px-1 py-1 border-r border-gray-200" style={{width: `${columnWidths.strength3}px`, minWidth: `${columnWidths.strength3}px`}} rowSpan={totalRows}>
                      <Input
                        type="number"
                        value={strengthData[mainTest.id]?.strength3 || ''}
                        onChange={(e) => handleStrengthDataUpdate(mainTest.id, 'strength3', e.target.value)}
                        placeholder="0000"
                        className="h-6 text-xs text-center"
                        disabled={is28DaySubmitted(mainTest.id)}
                      />
                    </TableCell>
                    <TableCell className={`px-2 py-1 text-xs font-semibold text-center border-r border-gray-200 ${getAverageColor(calculateAverage, mainTest.id, mainTest.strengthRequired)}`} style={{width: `${columnWidths.average}px`, minWidth: `${columnWidths.average}px`}} rowSpan={totalRows}>
                      {calculateAverage(mainTest.id)}
                    </TableCell>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.strengthRequired}px`, minWidth: `${columnWidths.strengthRequired}px`}} rowSpan={totalRows}>{mainTest.strengthRequired}</TableCell>
                    <TableCell className="px-1 py-1 border-r border-gray-200" style={{width: `${columnWidths.strengthSubmit}px`, minWidth: `${columnWidths.strengthSubmit}px`}} rowSpan={totalRows}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubmit28Day(mainTest.id)}
                        disabled={!is28DayComplete(mainTest.id) || is28DaySubmitted(mainTest.id)}
                        className="h-6 text-xs px-2"
                      >
                        {is28DaySubmitted(mainTest.id) ? 'Submitted' : 'Submit'}
                      </Button>
                    </TableCell>
                  </>
                )}

                {/* Additional Specs - only show on first row */}
                {isFirstRowOfGroup && (
                  <>
                    <TableCell className="px-2 py-1 text-xs border-r border-gray-200" style={{width: `${columnWidths.t20}px`, minWidth: `${columnWidths.t20}px`}} rowSpan={totalRows}>{mainTest.t20}</TableCell>
                    <TableCell className={`px-2 py-1 text-xs border-r border-gray-200 ${getPassFailColor(mainTest.jRing)}`} style={{width: `${columnWidths.jRing}px`, minWidth: `${columnWidths.jRing}px`}} rowSpan={totalRows}>{mainTest.jRing}</TableCell>
                    <TableCell className={`px-2 py-1 text-xs ${getPassFailColor(mainTest.staticSegregation)}`} style={{width: `${columnWidths.staticSegregation}px`, minWidth: `${columnWidths.staticSegregation}px`}} rowSpan={totalRows}>{mainTest.staticSegregation}</TableCell>
                  </>
                )}
              </TableRow>
            );

            currentRow++;
            return rowElement;
          });
        })
      )}
    </>
  );
};

export default FreshConcreteTableRow;
