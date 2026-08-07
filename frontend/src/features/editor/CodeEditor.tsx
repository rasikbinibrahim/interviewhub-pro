import Editor from '@monaco-editor/react';
import { useAppSelector } from '@/shared/hooks/redux';

export type EditorLanguage = 'javascript' | 'typescript';

interface CodeEditorProps {
  value: string;
  language: EditorLanguage;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, language, onChange }: CodeEditorProps) {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      onChange={(next) => onChange(next ?? '')}
      options={{
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
        minimap: { enabled: false },
        automaticLayout: true,
        tabSize: 2,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
