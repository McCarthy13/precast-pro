
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, setNotes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes and Observations</CardTitle>
        <CardDescription>Additional comments and observations</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any observations, equipment calibration notes, or additional comments..."
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default NotesSection;
