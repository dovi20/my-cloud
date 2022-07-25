import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder ,faFolderPlus} from '@fortawesome/free-solid-svg-icons'

function Folder(props) {
  return (
    <div className="folder" onClick={props.onClick}>
      <FontAwesomeIcon className="folder-icon" icon={faFolder}/>
      <div className="folder-name">{props.children}</div>
    </div>
  );
}

function AddFolder(props) {
    return (
      <div onClick={props.onClick} value={props.value} className="folder">
        <FontAwesomeIcon className="folder-icon" icon={faFolderPlus}/>
        <div className="folder-name">add new folder</div>
      </div>
    );
  }
export {Folder, AddFolder};
