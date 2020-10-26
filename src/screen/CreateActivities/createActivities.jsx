import React from "react";
import "./createActivities.styles.scss";
import { connect } from "react-redux";
import {
  addActivities,
  handleChange,
} from "../../redux/activities/activities.action";
import FormInput from "../../components/Form-Input/form-input.component";
import CustomButton from "../../components/Custome-Button/custom-button.component";

class CreateProject extends React.Component {
  render() {
    const { handleChange, setName, timeSet, addActivities } = this.props;
    return (
      <div className="container">
        <div>
          <h1>Add an activities</h1>
          <FormInput
            type="text"
            name="setName"
            handleChange={handleChange}
            value={setName}
            label={`Give a activity name`}
            required
          />
          <FormInput
            type="time"
            name="timeSet"
            handleChange={handleChange}
            value={timeSet}
            required
          />
          <CustomButton onClick={(event) => addActivities(event)}>
            Add
          </CustomButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setName: state.activities.setName,
  timeSet: state.activities.timeSet,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addActivities: (ac) => dispatch(addActivities(ac)),
    handleChange: (ac) => dispatch(handleChange(ac)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
