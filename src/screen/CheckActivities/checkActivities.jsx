import React from "react";
import "./checkActivities.styles.scss";
import { connect } from "react-redux";
class CheckActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <div>
        <h2>All activities - total {this.props.activities.length} rows</h2>
        <table>
          <tr>
            <th>Activity Name</th>
            <th>Status</th>
            <th>Time Remaining</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {this.props.activities.length > 0 ? (
            <>
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
                    >
                      <i className="fas fa-pen"></i>
                    </div>
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
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <h4>No activites yet. </h4>
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities.activities,
});

export default connect(mapStateToProps)(CheckActivity);
