import React from "react";
import { connect } from "react-redux";
import "./editActivityModal.styles.scss";
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CustomButton
            style={{ marginRight: "1rem" }}
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

const mapStateToProps = (state) => ({
  setId: state.activities.setId,
  timeSet: state.activities.timeSet,
  setName: state.activities.setName,
  showModal: state.activities.showModal,
  setValidTime: state.activities.setValidTime,
  setCompleted: state.activities.setCompleted,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    handleUpdate: (modal) => dispatch(handleUpdate(modal)),
    handleChange: (change) => dispatch(handleChange(change)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityModal);
