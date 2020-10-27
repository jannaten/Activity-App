import React from "react";
import { connect } from "react-redux";
import "./createActivities.styles.scss";
import { addActivities, handleChange } from "../../redux/";
import { FormInput, CustomButton } from "../../components/";

class CreateActivity extends React.Component {
  render() {
    const { handleChange, setName, timeSet, addActivities } = this.props;
    return (
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
