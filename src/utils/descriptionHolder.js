import React from "react";
import { data } from "./descripionData";

//Generate the suggestions
function descriptionHolder({ desc }) {
  return (
    <>
      {data.map(({ id, descripion, listItems }) => (
        <React.Fragment key={id}>
          {desc === descripion ? (
            <ul>
              {listItems.map((li) => (
                <li key={li.id}>{li.items}</li>
              ))}
            </ul>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}

export default descriptionHolder;
