import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile ,faFileArrowUp} from '@fortawesome/free-solid-svg-icons'

function File(props) {
    return (
      <div className="file">
        <FontAwesomeIcon className="files-icon" icon={faFile}/>
        <div className="file-name">{props.children}</div>
      </div>
    );
  }
  
  function AddFile(props) {
      return (
        <div onClick={props.onClick} name={props.name} className="folder">
          <FontAwesomeIcon className="folder-icon" icon={faFileArrowUp}/>
          <div className="folder-name">upload new file</div>
        </div>
      );
    }

    export {AddFile,File}