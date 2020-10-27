import React from "react";
import { connect } from "react-redux";
import "./checkActivities.styles.scss";
import Modal from "../../utils/setModal";
import { CustomButton, FormInput } from "../../components/";
import {
  deleteActivity,
  editActivity,
  handleChange,
  toggleModal,
  handleUpdate,
} from "../../redux/";

class CheckActivity extends React.Component {
  render() {
    return (
      <div>
        <h2>All activities - total {this.props.activities.length} rows</h2>
        <table>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Status</th>
              <th>Time Remaining</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {this.props.activities.length > 0 ? (
            <tbody>
              {this.props.activities.map((ac) => (
                <tr key={ac.id}>
                  {ac.completed ? (
                    <td style={{ textDecoration: "line-through" }}>
                      {ac.name}
                    </td>
                  ) : (
                    <td>{ac.name}</td>
                  )}
                  <td>
                    {ac.completed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              opacity: 0.5,
                              width: "0.7rem",
                              height: "0.7rem",
                              marginRight: "1rem",
                              background: "green",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Task accomplished</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              opacity: 0.5,
                              width: "0.7rem",
                              height: "0.7rem",
                              marginRight: "1rem",
                              background: "red",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Task ongoing</span>
                        </div>
                      </>
                    )}
                  </td>
                  <td>
                    {ac.timeSet ? (
                      <>
                        {ac.timeSet > 1 ? (
                          <span>{ac.timeSet} minutes</span>
                        ) : (
                          <span>{ac.timeSet} minute</span>
                        )}
                      </>
                    ) : (
                      <span>0 minute</span>
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        opacity: 0.65,
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        cursor: "pointer",
                        background: "white",
                        borderRadius: "50%",
                        marginRight: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(128,128,128, 0.5)",
                      }}
                      onClick={() =>
                        this.props.toggleModal({
                          setId: ac.id,
                          setCompleted: ac.completed,
                          setValidTime: ac.timeSet,
                          showModal: !this.props.showModal,
                        })
                      }
                    >
                      <i className="fas fa-pen"></i>
                    </div>
                    <Modal
                      show={this.props.showModal}
                      closeCallback={() =>
                        this.props.toggleModal({
                          showModal: !this.props.showModal,
                        })
                      }
                      customClass="custom_modal_class"
                    >
                      <React.Fragment>
                        <div>
                          <FormInput
                            type="text"
                            name="setName"
                            value={this.props.setName}
                            label={`Change activity name`}
                            handleChange={this.props.handleChange}
                            required
                          />
                          {this.props.setValidTime ? (
                            <FormInput
                              type="time"
                              name="timeSet"
                              value={this.props.timeSet}
                              handleChange={this.props.handleChange}
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
                              onClick={() =>
                                this.props.handleUpdate({
                                  id: this.props.setId,
                                  name: this.props.setName,
                                  timeSet: this.props.timeSet,
                                  completed: this.props.setCompleted,
                                })
                              }
                              style={{ marginRight: "1rem" }}
                            >
                              Update
                            </CustomButton>
                            <CustomButton
                              onClick={() =>
                                this.props.toggleModal({
                                  showModal: !this.props.showModal,
                                })
                              }
                            >
                              Close
                            </CustomButton>
                          </div>
                        </div>
                      </React.Fragment>
                    </Modal>
                  </td>
                  <td>
                    <div
                      style={{
                        opacity: 0.65,
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        cursor: "pointer",
                        background: "white",
                        borderRadius: "50%",
                        marginRight: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(128,128,128, 0.5)",
                      }}
                      onClick={() => this.props.deleteActivity(ac.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td>No activites yet.</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setId: state.activities.setId,
  timeSet: state.activities.timeSet,
  setCompleted: state.activities.setCompleted,
  setValidTime: state.activities.setValidTime,
  showModal: state.activities.showModal,
  setName: state.activities.setName,
  activities: state.activities.activities,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (activity) => dispatch(toggleModal(activity)),
    handleUpdate: (activity) => dispatch(handleUpdate(activity)),
    handleChange: (activity) => dispatch(handleChange(activity)),
    editActivity: (activity) => dispatch(editActivity(activity)),
    deleteActivity: (activity) => dispatch(deleteActivity(activity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckActivity);
