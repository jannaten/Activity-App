import React from "react";
import { connect } from "react-redux";
import ActivityStyle from "../styles";
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
                  <td style={ActivityStyle.LineThrogh}>{ac.name}</td>
                ) : (
                  <td>{ac.name}</td>
                )}
                <td>
                  {ac.completed ? (
                    <>
                      <div style={ActivityStyle.Container}>
                        <div style={ActivityStyle.listChildOne}></div>
                        <span>Task accomplished</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={ActivityStyle.Container}>
                        <div style={ActivityStyle.listChildTwo}></div>
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
                    style={ActivityStyle.ButtonRoundStyle}
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
                    style={ActivityStyle.ButtonRoundStyle}
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
