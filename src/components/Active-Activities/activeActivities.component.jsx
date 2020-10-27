import React from "react";
import { CustomButton } from "../";
import { connect } from "react-redux";
import "./activeActivities.styles.scss";
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
      <Droppable droppableId="activities">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {activitiesActive.map((ac, index) => {
              return (
                <Draggable key={ac.id} index={index} draggableId={ac.id}>
                  {(provided) => (
                    <div
                      key={ac.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {!ac.completed ? (
                        <div>
                          <h4>{ac.name}</h4>
                          {ac.timeSet >= 0 ? (
                            <p>
                              {ac.timeSet}{" "}
                              {ac.timeSet === 1 || ac.timeSet === 0 ? (
                                <span>minute</span>
                              ) : (
                                <span>minutes</span>
                              )}{" "}
                              to go
                            </p>
                          ) : (
                            <p>
                              You are {Math.abs(ac.timeSet)}{" "}
                              {Math.abs(ac.timeSet) === 1 ? (
                                <span>minute</span>
                              ) : (
                                <span>minutes</span>
                              )}{" "}
                              late
                            </p>
                          )}
                          <CustomButton
                            onClick={() => setArchriveActivities(ac.id)}
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
        <h1>No more active projects</h1>
      </>
    )}
  </DragDropContext>
);

const mapStateToProps = (state) => ({
  activitiesActive: state.activities.activitiesActive,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sortActivities: (activities) => dispatch(sortActivities(activities)),
    setArchriveActivities: (activities) =>
      dispatch(setArchriveActivities(activities)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveActivities);
