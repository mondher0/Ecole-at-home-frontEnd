/* eslint-disable react-hooks/exhaustive-deps */
import { RichTextEditor } from "@mantine/rte";
import "../css/EditEmail.css";
import { useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditMail = () => {
  const [recivers, setRecivers] = useState();
  const [object, setObject] = useState("");
  const [content, setContent] = useState();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // get model info
  const getModelInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/mail/${id}`);
      console.log(response);
      setObject(response.data.subject);
      setContent(response.data.bodyHtml);
    } catch (error) {
      console.log(error);
    }
  };

  // const send model
  const editModal = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
      const data = {
        subject: object,
        bodyHtml: content,
        receivers: [recivers],
      };
      const response = await axiosInstance.patch(`${baseURl}/mail/${id}`, data);
      console.log(response);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getModelInfo();
  }, []);
  return (
    <>
      <div className="container">
        <h3 className="current_page">
          <span>Emails</span>
          <span>{">"}</span>
          <span>Modifier le modèle</span>
        </h3>
        <div className="email_editor">
          <div
            className="top_bar"
            style={{
              marginTop: "20px",
            }}
          >
            Ercivez quelque chose...
          </div>
          <div className="email_content">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={editModal}
            >
              <input
                type="email"
                placeholder="A"
                required
                style={{
                  borderBottom: "1px solid #EDEFF1",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                  marginBottom: "10px",
                  outline: "none",
                }}
                onChange={(e) => setRecivers(e.target.value)}
              />
              <input
                type="text"
                placeholder="Object"
                required
                style={{
                  borderBottom: "1px solid #EDEFF1",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                  outline: "none",
                }}
                value={object}
                onChange={(e) => setObject(e.target.value)}
              />
              <RichTextEditor
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "20px",
                  borderBottom: "1px solid #EDEFF1",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                }}
                value={content}
                onChange={(e) => setContent(e)}
                required
              ></RichTextEditor>
              <div className="bottom_bar">
                <button className="cta">
                  {isLoaded ? "Chargement..." : error ? "Erreur" : "Modifier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMail;
