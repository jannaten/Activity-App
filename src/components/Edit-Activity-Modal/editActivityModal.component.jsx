import React from "react";
import ButtonStyle from "../styles";
import { connect } from "react-redux";
import Modal from "../../utils/setModal";
import { FormInput, CustomButton } from "..";
import { handleChange, handleUpdate, toggleModal } from "../../redux";

const EditActivityModal = ({
  setId,
  timeSet,
  setName,
  showModal,
  toggleModal,
  setCompleted,
  setValidTime,
  handleUpdate,
  handleChange,
}) => (
  <Modal
    show={showModal}
    className="setView"
    closeCallback={() =>
      toggleModal({
        showModal: !showModal,
      })
    }
    customClass="custom_modal_class"
  >
    <React.Fragment>
      <div>
        <FormInput
          type="text"
          name="setName"
          value={setName}
          handleChange={handleChange}
          label={`Change activity name`}
          required
        />
        {setValidTime ? (
          <FormInput
            type="time"
            name="timeSet"
            value={timeSet}
            handleChange={handleChange}
            required
          />
        ) : null}
        <div style={ButtonStyle.customButtonHolder}>
          <CustomButton
            style={ButtonStyle.buttonSpace}
            onClick={() =>
              toggleModal({
                showModal: !showModal,
              })
            }
          >
            Close
          </CustomButton>
          <CustomButton
            onClick={() =>
              handleUpdate({
                id: setId,
                name: setName,
                timeSet: timeSet,
                completed: setCompleted,
              })
            }
          >
            Update
          </CustomButton>
        </div>
      </div>
    </React.Fragment>
  </Modal>
);

//Calling the state from the reducer
const mapStateToProps = ({
  activities: {
    setId,
    timeSet,
    setName,
    showModal,
    setValidTime,
    setCompleted,
  },
}) => ({
  setId,
  timeSet,
  setName,
  showModal,
  setValidTime,
  setCompleted,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  toggleModal: (modal) => dispatch(toggleModal(modal)),
  handleUpdate: (modal) => dispatch(handleUpdate(modal)),
  handleChange: (change) => dispatch(handleChange(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityModal);
