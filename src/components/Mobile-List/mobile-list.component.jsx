import React, { useState } from "react";
import { CustomButton, ListDropDown } from "../";
import ListStyle from "../styles";

const MobileList = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <CustomButton
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? "X" : "+"}
      </CustomButton>
      {active && (
        <ListDropDown style={ListStyle.listSet} setActive={setActive} />
      )}
    </>
  );
};

export default MobileList;
