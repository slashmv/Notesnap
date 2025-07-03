import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  message,
  Select,
  Steps,
  theme,
  Typography,
} from "antd";
import SingleFileUploader from "./SingleFileUploader";
import "../styles/UploadTab.css";

const { TextArea } = Input;
const { Title } = Typography;

const UploadTab = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [fileDetails, setFileDetails] = useState({});
  const [file, setFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch("http://localhost:8000/api/get_subjects/")
      .then((res) => res.json())
      .then((res) => {
        res = res.map((sub) => {
          return { value: sub.id, label: sub.name };
        });
        setSubjects(res);
      });
  }, []);

  const resetStates = () => {
    setCurrent(0);
    setFileDetails({});
    setFile(null);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", fileDetails.title);
      formData.append("subject", fileDetails.subject);
      formData.append("additional_notes", fileDetails.addnDetails);
      formData.append("uploader", 3);

      try {
        await fetch("http://localhost:8000/api/create_summarised_notes/", {
          method: "POST",
          body: formData,
        });
        messageApi.open({
          type: "success",
          content: "Lecture uploaded successfully",
        });
        resetStates();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const changeTitle = (e) => {
    let newTitle = e.target.value;
    setFileDetails((fd) => {
      return { ...fd, title: newTitle };
    });
  };
  const changeSubject = (newSubject) => {
    setFileDetails((fd) => {
      return { ...fd, subject: newSubject };
    });
  };
  const changeAddnDetails = (e) => {
    setFileDetails((fd) => {
      return { ...fd, addnDetails: e.target.value };
    });
  };
  const steps = [
    {
      title: "Enter Details",
      content: (
        <Flex vertical gap={32}>
          <Title>Lecture Details</Title>
          <Input
            showCount
            maxLength={50}
            onChange={changeTitle}
            placeholder="Title"
            value={fileDetails.title}
          />
          <Select
            placeholder="Choose a subject"
            optionFilterProp="label"
            onChange={changeSubject}
            options={subjects}
            value={fileDetails.subject}
          />
          <TextArea
            showCount
            maxLength={200}
            onChange={changeAddnDetails}
            value={fileDetails.addnDetails}
            placeholder="Additional notes (Optional)"
          />
        </Flex>
      ),
    },
    {
      title: "Upload file",
      content: (
        <Flex justify="center" align="center" vertical>
          <SingleFileUploader
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            loading={loading}
          />
        </Flex>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    textAlign: "left",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: "2em",
  };
  const isNextBtnDisabled = () => {
    return !(
      Object.keys(fileDetails).includes("title") &&
      fileDetails.title.trim() !== "" &&
      Object.keys(fileDetails).includes("subject")
    );
  };

  return (
    <>
      {contextHolder}
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            disabled={isNextBtnDisabled()}
          >
            Next
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
            disabled={loading}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default UploadTab;
