import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/richtext.css';

const FULL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean']
  ]
};

const SIMPLE_MODULES = {
  toolbar: [['bold', 'italic', 'link'], ['clean']]
};

export default function RichTextEditor({ value, onChange, placeholder, simple = false }) {
  const modules = useMemo(() => (simple ? SIMPLE_MODULES : FULL_MODULES), [simple]);

  return (
    <div className="richtext-editor">
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
