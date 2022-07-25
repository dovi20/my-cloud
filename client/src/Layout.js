import { useEffect, useState } from "react";
import "./App.css";
import Popup from "./components/Popup";
import axios from "axios";
import { Folder } from "./components/Folder";
import { AddFolder } from "./components/Folder";
import { AddFile } from "./components/File";
import { File } from "./components/File";
import Header from "./components/Header";
import { Route, Routes, Redirect } from "react";
import Main from "./components/Main";
import HeaderMain from "./components/HeaderMain";
import ContentContainer from "./components/ContentContainer";
import { Button, CloseButton, Modal } from "react-bootstrap";

function Layout() {
  const [popupValue, setPopupValue] = useState("folder");
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([[], []]);
  const [dataToServer, setDataToServer] = useState();
  const [correntPath, setCorrentPath] = useState();
  const [errFromServer, setErrFromServer] = useState("");
  let flag = false;
  useEffect(() => {
    setCorrentPath(document.location.pathname);
  });

  async function createFolder() {
    flag = false;
    try {
      let cteate = await axios({
        method: "post",
        url: "http://localhost:3005/create-folder/",
        data: {
          folder: dataToServer,
          path: document.location.pathname,
        },
      });
    } catch (err) {
      flag = true;
      setErrFromServer(err.response.data);
    }
    setPopup();
  }

  //   .catch((res) => {
  //     setErrFromServer(res.response.data);
  //     console.log(flag);
  //     flag = true;
  //     console.log(flag, "2");
  //   })
  //   .finally(() => {
  //     console.log(flag, "3");
  //     console.log(errFromServer,"5");
  //     if(!flag){
  //         setPopup()

  //       }
  //   });

  console.log(data);
  useEffect(() => {
    const path = { path: document.location.pathname };
    axios
      .get("http://localhost:3005/getfiles", { headers: path })
      .then((res) => {
        let listOfFiles = res.data.body;
        setData([listOfFiles.files, listOfFiles.folders]);
      });
  }, [popup]);

  function uploadFile(e) {
    console.log(e);
    const path = { path: document.location.pathname };
    const formData = new FormData();
    formData.append("file", dataToServer);
    formData.append("path", path);
    axios.post("http://localhost:3005/uploadfile", formData, { headers: path });
    popupState();
  }
  function popupState() {
    setPopup(!popup);
    setErrFromServer("");
  }
  function uploadFileDialog() {
    setPopupValue("file");
    popupState();
  }
  function uploadFolderDialog() {
    setPopupValue("folder");
    popupState();
  }
  function testNavigate(e) {}
  return (
    <div className="App">
      {popup && (
        <Popup onClick={popupState}>
          <div className="popup-content">
            <CloseButton onClick={popupState} className="close-button">
              ❌
            </CloseButton>
            {popupValue === "folder" ? (
              <>
                <h2>folder name</h2>
                <input
                  type="text"
                  onChange={(e) => {
                    setDataToServer(e.target.value);
                  }}
                />
                {errFromServer && <span>{errFromServer}</span>}
                <button onClick={createFolder}>create folder</button>
              </>
            ) : (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    setDataToServer(e.target.files[0]);
                  }}
                />
                <button onClick={uploadFile}>upload file</button>
              </>
            )}
          </div>
        </Popup>
      )}
      <Header />
      <Main>
        <HeaderMain>
          <AddFolder onClick={uploadFolderDialog} />
          <h2>{document.URL.slice(21)}</h2>
          <AddFile value="addFile" onClick={uploadFileDialog} />
        </HeaderMain>
        <ContentContainer>
          <div className="folders">
            <div className="folder-div">
              {data[1].map((v) => (
                <>
                  <a href={`${correntPath}/${v}`}>
                    <Folder onClick={testNavigate}>{v}</Folder>
                  </a>
                </>
              ))}
            </div>
          </div>
          <div className="folders">
            <div className="folder-div">
              {data[0].map((v) => (
                <>
                  <File>{v}</File>
                </>
              ))}
            </div>
          </div>
        </ContentContainer>
      </Main>
    </div>
  );
}

export { Layout };
