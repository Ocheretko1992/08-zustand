import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

interface PropsFilter {
  params: Promise<{ slug: string[] }>;
}

const Notes = async({ params }: PropsFilter)=> {

  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ search: '', page: 1, tag}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
export default Notes;
