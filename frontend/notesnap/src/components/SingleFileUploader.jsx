import "../styles/SingleFileUploader.css";
import { Button } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const SingleFileUploader = ({ file, setFile, handleUpload, loading }) => {
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <Button
          type="primary"
          icon={<CloudUploadOutlined />}
          onClick={handleUpload}
          className="submit"
          loading={loading}
        >
          {loading ? "Uploading file" : "Uplaod file"}
        </Button>
      )}
    </>
  );
};

export default SingleFileUploader;
