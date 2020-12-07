import React from "react";
import { connect } from "react-redux";
import { addActivities, handleChange } from "../../redux/";
import { FormInput, CustomButton } from "../../components/";

const CreateActivity = ({ handleChange, setName, timeSet, addActivities }) => (
  <div className="container">
    <div>
      <h1>Add an activities</h1>
      <FormInput
        type="text"
        name="setName"
        value={setName}
        handleChange={handleChange}
        label={`Give a activity name`}
        required
      />
      <FormInput
        type="time"
        name="timeSet"
        value={timeSet}
        handleChange={handleChange}
        required
      />
      <CustomButton onClick={(event) => addActivities(event)}>Add</CustomButton>
    </div>
  </div>
);

//Calling the state from the reducer
const mapStateToProps = ({ activities: { setName, timeSet } }) => ({
  setName,
  timeSet,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  handleChange: (ac) => dispatch(handleChange(ac)),
  addActivities: (ac) => dispatch(addActivities(ac)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
