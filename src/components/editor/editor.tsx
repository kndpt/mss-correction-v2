'use client';

/* eslint-disable perfectionist/sort-imports */
import 'src/utils/highlight';

import { alpha } from '@mui/material/styles';

import { useRef, useMemo, LegacyRef, useCallback } from 'react';
import type ReactQuill from 'react-quill';
import dynamic from 'next/dynamic';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { STORAGE } from 'src/utils/firebase';
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';

import 'react-quill/dist/quill.snow.css';

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: LegacyRef<ReactQuill>;
}

const ReactQuillBase = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
      return <RQ ref={forwardedRef} {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const handleImageUpload = useCallback(async () => {
    const editor = quillRef.current?.getEditor();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!input.files || !editor) return;
      const file = input.files[0];

      try {
        const storageRef = ref(STORAGE, `posts/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', url);
      } catch (err) {
        console.log('upload err:', err);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: handleImageUpload,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: true,
      clipboard: {
        matchVisual: false,
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            '& .ql-editor': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >
        <Toolbar id={id} simple={simple} />

        <ReactQuillBase
          forwardedRef={quillRef}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
