import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MDBCol, MDBRow } from "mdbreact";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 0,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const dragText = {
  width: "100%",
  border: "2px dashed lightgray",
  borderRadius: "6px",
  textAlign: "center",
  color: "#6c757d",
  minHeight: "6em",
  lineHeight: "2em",
  paddingTop: "2em",
};

export const UploadFile = ({ setFieldValue, title }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue("picture", acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <MDBRow>
      <MDBCol md="6" lg="6" sm="12">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div style={dragText}>{title}</div>
        </div>
      </MDBCol>
      <MDBCol md="6" lg="6" sm="12" className="mt-1">
        <aside style={thumbsContainer}>{thumbs}</aside>
      </MDBCol>
    </MDBRow>
  );
};
