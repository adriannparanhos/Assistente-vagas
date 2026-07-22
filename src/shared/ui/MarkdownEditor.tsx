import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  initialValue: string;
  onSave: (newContent: string) => void;
}

export function MarkdownEditor({ initialValue, onSave }: MarkdownEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialValue);

  function handleSave() {
    onSave(content);
    setIsEditing(false);
  }

  function handleCancel() {
    setContent(initialValue);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <textarea
          className="h-64 w-full resize-y rounded-md border border-gray-700 bg-gray-950 p-4 text-sm text-gray-100 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva suas anotações aqui em Markdown..."
          value={content}
        />
        <div className="flex items-center justify-end gap-3">
          <button
            className="rounded-md px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-cyan-300"
            onClick={handleSave}
            type="button"
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border border-gray-800 bg-gray-900/50 p-6">
      <button
        className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
        onClick={() => setIsEditing(true)}
        type="button"
      >
        <Edit2 className="h-3.5 w-3.5" aria-hidden="true" />
        Editar Anotações
      </button>

      {content ? (
        <div className="prose prose-invert max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
          Nenhuma anotação registrada ainda.
        </div>
      )}
    </div>
  );
}
