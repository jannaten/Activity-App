import React from "react";
import { connect } from "react-redux";
import "./checkActivities.styles.scss";
import { TableHeader } from "./tableHeader";
import { EditActivityModal } from "../../components/";
import { deleteActivity, toggleModal } from "../../redux/";

const CheckActivity = ({
  deleteActivity,
  toggleModal,
  activities,
  showModal,
}) => {
  return (
    <div>
      <h2>All activities - total {activities.length} rows</h2>
      <table>
        <thead>
          <tr>
            {TableHeader.map(({ id, value }) => (
              <th key={id}>{value}</th>
            ))}
          </tr>
        </thead>
        {activities.length > 0 ? (
          <tbody>
            {activities.map((ac) => (
              <tr key={ac.id}>
                {ac.completed ? (
                  <td style={{ textDecoration: "line-through" }}>{ac.name}</td>
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
                      toggleModal({
                        setId: ac.id,
                        setCompleted: ac.completed,
                        setValidTime: ac.timeSet,
                        showModal: !showModal,
                      })
                    }
                  >
                    <i className="fas fa-pen"></i>
                  </div>
                  <EditActivityModal />
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
                    onClick={() => deleteActivity(ac.id)}
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
};

const mapStateToProps = (state) => ({
  showModal: state.activities.showModal,
  activities: state.activities.activities,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (activity) => dispatch(toggleModal(activity)),
    deleteActivity: (activity) => dispatch(deleteActivity(activity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckActivity);
