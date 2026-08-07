import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layouts/AppShell';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { QuestionList } from '@/features/questions/QuestionList';
import { CodingScreen } from '@/features/questions/CodingScreen';
import { BookmarksPage } from '@/features/bookmarks/BookmarksPage';
import { RevisionPage } from '@/features/revision/RevisionPage';
import { SettingsPage } from '@/features/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/practice', element: <QuestionList /> },
      { path: '/practice/:questionId', element: <CodingScreen /> },
      { path: '/bookmarks', element: <BookmarksPage /> },
      { path: '/revision', element: <RevisionPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
]);
