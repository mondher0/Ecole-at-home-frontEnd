/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";
import { useEffect } from "react";

const EmailsPage = () => {
  const Navigate = useNavigate();
  const [mails, setMails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
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
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/mail/?pageSize=5&page=${currentPage}`
      );
      console.log(response);
      if (response.data?.mails.length === 0) {
        setIsEmpy(true);
      }
      setMails(response.data?.mails);
      setPages(response.data?.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
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

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage === pages / currentPage) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getMails();
  }, [currentPage]);

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
                <td>
                  {mail.receivers?.map((receiver) => (
                    <span
                      key={Math.random()}
                      style={{
                        display: "block",
                      }}
                    >
                      {receiver}
                    </span>
                  ))}
                </td>
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
        {isLoading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {isError && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Erreur de chargement
          </h1>
        )}

        {isEmpy && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Aucun Email trouvé
          </h1>
        )}
        <div className="table_pagination_bar">
          <div
            className="pagination_btns"
            style={{
              gap: "10px",
            }}
          >
            <button
              className="pagination_arrow"
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              <img
                src="../assets/arrow.svg"
                style={{
                  height: "20px",
                }}
              />
            </button>
            <button className="pagination_btn selected">{currentPage}</button>
            <button
              className="pagination_arrow right"
              onClick={goToNextPage}
              disabled={currentPage == Math.ceil(pages / 5)}
            >
              <img
                src="../assets/arrow.svg"
                style={{
                  height: "20px",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;
