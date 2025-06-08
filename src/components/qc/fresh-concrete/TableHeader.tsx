
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { columnWidths } from './types';

const FreshConcreteTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.date}px`, minWidth: `${columnWidths.date}px`}}>Date</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.time}px`, minWidth: `${columnWidths.time}px`}}>Time</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.mixDesign}px`, minWidth: `${columnWidths.mixDesign}px`}}>Mix<br/>ID</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.batchTicket}px`, minWidth: `${columnWidths.batchTicket}px`}}>Batch<br/>#</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.form}px`, minWidth: `${columnWidths.form}px`}}>Form</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.job}px`, minWidth: `${columnWidths.job}px`}}>Job</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.pieces}px`, minWidth: `${columnWidths.pieces}px`}}>Pieces</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.slumpFlow}px`, minWidth: `${columnWidths.slumpFlow}px`}}>Slump<br/>(Flow)<br/>(in)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.airContent}px`, minWidth: `${columnWidths.airContent}px`}}>Air<br/>(%)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.ambientTemp}px`, minWidth: `${columnWidths.ambientTemp}px`}}>Amb<br/>Temp<br/>(°F)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.concreteTemp}px`, minWidth: `${columnWidths.concreteTemp}px`}}>Conc<br/>Temp<br/>(°F)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.unitWeight}px`, minWidth: `${columnWidths.unitWeight}px`}}>Unit<br/>Wt<br/>(lb/ft³)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.yield}px`, minWidth: `${columnWidths.yield}px`}}>Yield<br/>(ft³)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.relativeYield}px`, minWidth: `${columnWidths.relativeYield}px`}}>Rel<br/>Yield</TableHead>
        <TableHead className="text-center font-semibold bg-blue-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={3}>
          RELEASE RESULTS
        </TableHead>
        <TableHead className="text-center font-semibold bg-purple-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={6}>
          28-DAY STRENGTH RESULTS
        </TableHead>
        <TableHead className="text-center font-semibold bg-gray-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={3}>
          ADDITIONAL SPECS
        </TableHead>
      </TableRow>
      <TableRow>
        {/* Spacer cells for main columns */}
        {Array.from({length: 14}, (_, i) => (
          <TableHead key={i} className="p-0 h-0"></TableHead>
        ))}
        
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.release}px`, minWidth: `${columnWidths.release}px`}}>Release</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseRequired}px`, minWidth: `${columnWidths.releaseRequired}px`}}>Required</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit}px`, minWidth: `${columnWidths.releaseSubmit}px`}}>Submit<br/>Release</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength1}px`, minWidth: `${columnWidths.strength1}px`}}>28-Day<br/>#1</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength2}px`, minWidth: `${columnWidths.strength2}px`}}>28-Day<br/>#2</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength3}px`, minWidth: `${columnWidths.strength3}px`}}>28-Day<br/>#3</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.average}px`, minWidth: `${columnWidths.average}px`}}>Average</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthRequired}px`, minWidth: `${columnWidths.strengthRequired}px`}}>Required</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit}px`, minWidth: `${columnWidths.strengthSubmit}px`}}>Submit<br/>28-Day</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.t20}px`, minWidth: `${columnWidths.t20}px`}}>T-20<br/>(sec)</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.jRing}px`, minWidth: `${columnWidths.jRing}px`}}>J-Ring</TableHead>
        <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.staticSegregation}px`, minWidth: `${columnWidths.staticSegregation}px`}}>Static<br/>Seg</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FreshConcreteTableHeader;
