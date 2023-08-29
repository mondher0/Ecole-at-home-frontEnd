import { RichTextEditor } from "@mantine/rte";
import "../css/EditEmail.css";
import { useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";

const AddEmail = () => {
  const [recivers, setRecivers] = useState();
  const [object, setObject] = useState("");
  const [content, setContent] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  // const send model
  const sendModel = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
      const data = {
        subject: object,
        bodyHtml: content,
        receivers: [recivers],
      };
      const response = await axiosInstance.post(`${baseURl}/mail/`, data);
      console.log(response);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="current_page">
          <span>Emails</span>
          <span>{">"}</span>
          <span>Ajouter un modèle</span>
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
              onSubmit={sendModel}
            >
              <input
                type="email"
                placeholder="A"
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
                style={{
                  borderBottom: "1px solid #EDEFF1",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                  outline: "none",
                }}
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
              ></RichTextEditor>
              <div className="bottom_bar">
                <button className="cta">
                  {isLoaded
                    ? "Chargement..."
                    : error
                    ? "Erreur"
                    : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmail;
