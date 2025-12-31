import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteCreatePayload } from '@/types/note';

const initialDraft: NoteCreatePayload = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface useNoteDraft {
  draft: NoteCreatePayload;
  setDraft: (note: NoteCreatePayload) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<useNoteDraft>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
