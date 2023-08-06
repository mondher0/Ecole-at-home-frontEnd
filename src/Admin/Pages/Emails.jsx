// eslint-disable-next-line no-unused-vars
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";
import { useEffect } from "react";

const EmailsPage = () => {
  const Navigate = useNavigate();
  const [mails, setMails] = useState();
  const columns = [
    "ID",
    "Objet mail",
    "Contenu",
    "Destination",
    // "lantence",
    "Action",
  ];
  // get mails
  const getMails = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/mail/?pageSize=5&page=1`
      );
      console.log(response);
      setMails(response.data?.mails);
    } catch (error) {
      console.log(error);
    }
  };

  // delete mail
  const deleteMail = async (id) => {
    try {
      const response = await axiosInstance.delete(`${baseURl}/mail/${id}`);
      console.log(response);
      getMails();
    } catch (error) {
      console.log(error);
    }
  };

  // send email
  const sendEmail = async (id) => {
    try {
      const response = await axiosInstance.post(`${baseURl}/mail/${id}`);
      console.log(response);
      getMails();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMails();
  }, []);

  return (
    <div className="admin_section">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Emails</h2>
        <button
          className="cta"
          onClick={() => Navigate("/admin/ajouter-email")}
        >
          <img src="../assets/email_model.svg" />
          <span>Ajouter un modèle</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mails?.map((mail) => (
              <tr key={mail.id}>
                <td>{mail.id}</td>
                <td>{mail.subject}</td>
                <td dangerouslySetInnerHTML={{ __html: mail.bodyHtml }} />
                <td>{mail.receivers[0]}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      sendEmail(mail.id);
                    }}
                  >
                    <img src="../assets/paper_plane.svg" />
                  </button>
                  <button className="btn">
                    <img
                      src="../assets/admin_edit.svg"
                      onClick={() => Navigate(`/admin/email/edit/${mail.id}`)}
                    />
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      deleteMail(mail.id);
                    }}
                  >
                    <img src="../assets/admin_delete.svg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table_pagination_bar">
          <div className="pagination_btns">
            <button className="pagination_arrow">
              <img src="../assets/arrow.svg" />
            </button>
            <button className="pagination_btn selected">1</button>
            <button className="pagination_btn">2</button>
            <button className="pagination_btn">3</button>
            <button className="pagination_arrow right">
              <img src="../assets/arrow.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;
