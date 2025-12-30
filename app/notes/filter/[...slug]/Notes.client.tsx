'use client';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Error from '@/components/Error/Error';
import useModalControl from '@/hooks/useModalChange';
import { fetchNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { toast, Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';
import Loading from '@/app/loading';

interface NotesProp {
  tag?: string;
}

export default function NotesClient({ tag }: NotesProp) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { isOpen, openModal, closeModal } = useModalControl();

  const {
    data: response,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes({ search, page, tag }),
    enabled: page !== 0,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = response?.totalPages ?? 0;

  useEffect(() => {
    if (response?.notes.length === 0) {
      toast.dismiss();
      toast.error('No notes found for your request.', {
        duration: 1000,
      });
    }
  }, [response, response?.notes, isSuccess]);

  const hendleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <>
      <section className={css.app}>
        <Toaster />
        <div className={css.toolbar}>
          <SearchBox
            search={search}
            onChange={e => hendleSearch(e.target.value)}
          />
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </div>
        {isError && <Error />}
        {isSuccess && <NoteList notes={response.notes} />}
        {isLoading && <Loading />}

        {isOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccessClose={closeModal} />
          </Modal>
        )}
      </section>
    </>
  );
}
