import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface PropsFilter {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PropsFilter): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: tag === 'all' ? 'All Notes page' : `Notes page - "${tag}"`,
    description: tag === 'all' ? 'All Notes' : `Notes tagged with "${tag}"`,
    openGraph: {
      title: tag === 'all' ? 'All Notes page' : `Notes page - "${tag}"`,
      description: tag === 'all' ? 'All Notes' : `Notes tagged with "${tag}"`,
      url: `http://localhost:3000//notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub`,
        },
      ],
    },
  };
}

const Notes = async ({ params }: PropsFilter) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ search: '', page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};
export default Notes;
