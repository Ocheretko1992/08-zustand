'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from '@/components/NoteDetails/NoteDetails';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <h2 style={{ color: 'black', margin: '0 auto', marginTop: '70px' }}>
        Loading, please wait...
      </h2>
    );
  }
  if (isError) {
    return (
      <h2 style={{ color: 'black', margin: '0 auto', marginTop: '70px' }}>
        Something went wrong!
      </h2>
    );
  }
  if (!note) {
    return (
      <h2 style={{ color: 'black', margin: '0 auto', marginTop: '70px' }}>
        Something went wrong!
      </h2>
    );
  }
  return (
    <>
      <NoteDetails note={note} />
    </>
  );
}
