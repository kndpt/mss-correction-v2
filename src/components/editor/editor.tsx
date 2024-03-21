import Quill from 'quill';
import ReactQuill from 'react-quill';
import React, { useMemo } from 'react';
import ImageUploader from 'quill-image-uploader';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { alpha } from '@mui/material/styles';

import 'src/utils/highlight';
import { STORAGE } from 'src/utils/firebase';

import { EditorProps } from './types';
import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';

Quill.register('modules/imageUploader', ImageUploader);

// ----------------------------------------------------------------------

export const Editor = ({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) => {
  const handleImageUpload = async (file: any) => {
    const storageRef = ref(STORAGE, `posts/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    if (url) {
      return url;
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
      },
      imageUploader: {
        upload: handleImageUpload,
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
    [id]
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

        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
};
