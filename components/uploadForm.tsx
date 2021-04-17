import { CSSProperties, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Row from './ui/row';

const dragText: CSSProperties = {
  width: '100%',
  border: '2px dashed lightgray',
  borderRadius: '6px',
  textAlign: 'center',
  color: '#6c757d',
  minHeight: '6em',
  lineHeight: '2em',
  paddingTop: '2em',
};

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

export const UploadFile = ({ onChange, children }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full"
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <Row>
      <div className="col-12 md:col-6">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps({ onChange })} />
          <div style={dragText}>{children}</div>
        </div>
      </div>
      <div className="col-12 md:col-6 mt-1">
        <aside className="flex flex-row flex-wrap mt-0">{thumbs}</aside>
      </div>
    </Row>
  );
};
