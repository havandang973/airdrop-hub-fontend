import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({
  onChange,
  value,
}: {
  onChange?: (content: string) => void;
  value?: string;
}) {
  return (
    <Editor
      apiKey="gdodu3mdloaydidzg3n4ss8oeht5nr3abzurx0k56rh3x2ef"
      value={value}
      onEditorChange={(content: any) => {
        if (onChange) onChange(content);
      }}
      init={{
        plugins: [
          // Core editing features
          'anchor',
          'autolink',
          'charmap',
          'codesample',
          'emoticons',
          'link',
          'image',
          'lists',
          'media',
          'searchreplace',
          'table',
          'visualblocks',
          'wordcount',
        ],
        file_picker_types: 'image',
        file_picker_callback: (callback: any, value: any, meta: any) => {
          if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = async function () {
              const file = (this as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                  const base64 = reader.result as string;
                  callback(base64, { title: file.name });
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }
        },
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() =>
            Promise.reject('See docs to implement AI Assistant')
          ),
        uploadcare_public_key: 'dc99983c438546c2fafc',
      }}
    />
  );
}
