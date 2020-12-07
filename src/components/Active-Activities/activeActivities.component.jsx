import React from "react";
import { CustomButton } from "../";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectActivitiesActive } from "../../redux/";
import { sortActivities, setArchriveActivities } from "../../redux/";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ActiveActivities = ({
  sortActivities,
  activitiesActive,
  setArchriveActivities,
}) => (
  <DragDropContext onDragEnd={(value) => sortActivities(value)}>
    <h3>Activities on process</h3>
    {activitiesActive !== undefined ? (
      <>
        {activitiesActive.length > 0 ? (
          <Droppable droppableId="activities">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {activitiesActive.map((ac, index) => {
                  const { id, name, timeSet, completed } = ac;
                  return (
                    <Draggable key={id} index={index} draggableId={id}>
                      {(provided) => (
                        <div
                          key={id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {!completed ? (
                            <div>
                              <h4>{name}</h4>
                              {timeSet >= 0 ? (
                                <p>
                                  {timeSet}{" "}
                                  {timeSet === 1 || timeSet === 0 ? (
                                    <span>minute</span>
                                  ) : (
                                    <span>minutes</span>
                                  )}{" "}
                                  to go
                                </p>
                              ) : (
                                <p>
                                  You are {Math.abs(timeSet)}{" "}
                                  {Math.abs(timeSet) === 1 ? (
                                    <span>minute</span>
                                  ) : (
                                    <span>minutes</span>
                                  )}{" "}
                                  late
                                </p>
                              )}
                              <CustomButton
                                onClick={() => setArchriveActivities(id)}
                              >
                                Move to Archive
                              </CustomButton>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <>
            <h4>No more active projects</h4>
            <Link to={{ pathname: "/Activity-App/create" }}>
              <CustomButton>Add Activity</CustomButton>
            </Link>
          </>
        )}
      </>
    ) : (
      window.location.reload()
    )}
  </DragDropContext>
);

//Calling the state from the reducer
const mapStateToProps = createStructuredSelector({
  activitiesActive: selectActivitiesActive,
});

//Calling the methods from the reducer
const mapDispatchToProps = (dispatch) => ({
  sortActivities: (activities) => dispatch(sortActivities(activities)),
  setArchriveActivities: (activities) =>
    dispatch(setArchriveActivities(activities)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveActivities);
