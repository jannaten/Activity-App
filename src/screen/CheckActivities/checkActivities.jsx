import React from "react";
import { connect } from "react-redux";
import "./checkActivities.styles.scss";
import Modal from "../../utils/setModal";
import { CustomButton, FormInput } from "../../components/";
import { deleteActivity, editActivity, handleChange } from "../../redux/";

class CheckActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      setId: "",
      setName: "",
      timeSet: "",
      setCompleted: "",
      setValidTime: "",
      showModal: false,
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  toggleModal = (e) => {
    this.setState({
      setId: e.id,
      setCompleted: e.completed,
      setValidTime: e.setValidTime,
      showModal: !this.state.showModal,
    });
  };

  handleEdit = (e) => {
    e.preventDefault();
    let obj = {
      id: this.state.setId,
      name: this.state.setName,
      timeSet: this.state.timeSet,
      completed: this.state.setCompleted,
    };
    console.log(obj);
  };

  render() {
    console.log(this.state.setValidTime);
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
                        this.toggleModal({
                          id: ac.id,
                          completed: ac.completed,
                          setValidTime: ac.timeSet,
                        })
                      }
                    >
                      <i className="fas fa-pen"></i>
                    </div>
                    <Modal
                      show={this.state.showModal}
                      closeCallback={this.toggleModal}
                      customClass="custom_modal_class"
                    >
                      <React.Fragment>
                        <div>
                          <FormInput
                            type="text"
                            name="setName"
                            value={this.state.setName}
                            label={`Change activity name`}
                            handleChange={this.handleChange}
                            required
                          />
                          {this.state.setValidTime ? (
                            <FormInput
                              type="time"
                              name="timeSet"
                              handleChange={this.handleChange}
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
                              onClick={this.handleEdit}
                              style={{ marginRight: "1rem" }}
                            >
                              Update
                            </CustomButton>
                            <CustomButton onClick={this.toggleModal}>
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
    editActivity: (activity) => dispatch(editActivity(activity)),
    deleteActivity: (activity) => dispatch(deleteActivity(activity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckActivity);
