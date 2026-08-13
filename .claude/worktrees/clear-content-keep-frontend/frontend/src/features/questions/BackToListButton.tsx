import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * "Back" control for a question detail screen. Uses navigate(-1) instead
 * of a hardcoded <Link to="/practice">, so it returns to whatever the
 * list's exact prior URL was (filters, category, page — see
 * QuestionList's comment for why that state lives in the URL) rather
 * than resetting the list to its defaults.
 *
 * Falls back to a plain '/practice' link when there's no in-app history
 * to go back to (location.key === 'default' means this is the first
 * entry in the session — e.g. the question was opened directly via URL
 * or a new tab), since navigate(-1) in that case would leave the app
 * entirely instead of showing the list.
 */
export function BackToListButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    if (location.key === 'default') {
      navigate('/practice');
    } else {
      navigate(-1);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
    >
      <ArrowLeft size={14} /> Back
    </button>
  );
}
