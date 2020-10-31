import React from "react";
import { connect } from "react-redux";
import ActivityStyle from "../styles";
import "./checkActivities.styles.scss";
import { Link } from "react-router-dom";
import { TableHeader } from "./tableHeader";
import { CustomButton, EditActivityModal } from "../../components/";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteActivity, sortCheckActivities, toggleModal } from "../../redux/";

const CheckActivity = ({
  sortCheckActivities,
  deleteActivity,
  toggleModal,
  activities,
  showModal,
}) => {
  return (
    <DragDropContext onDragEnd={(value) => sortCheckActivities(value)}>
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
            <Droppable droppableId="activities">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {activities.map((ac, index) => (
                    <Draggable key={ac.id} index={index} draggableId={ac.id}>
                      {(provided) => (
                        <tr
                          key={ac.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                                  showModal: !showModal,
                                  setValidTime: ac.timeSet,
                                  setCompleted: ac.completed,
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          ) : null}
        </table>
        {activities.length === 0 ? (
          <div>
            <p>No activites yet.</p>
            <Link to={{ pathname: "/create" }}>
              <CustomButton>Add Activity</CustomButton>
            </Link>
          </div>
        ) : null}
      </div>
    </DragDropContext>
  );
};

//Calling the state from the reducer
const mapStateToProps = ({ activities: { showModal, activities } }) => ({
  showModal,
  activities,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  toggleModal: (activity) => dispatch(toggleModal(activity)),
  deleteActivity: (activity) => dispatch(deleteActivity(activity)),
  sortCheckActivities: (activity) => dispatch(sortCheckActivities(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckActivity);
