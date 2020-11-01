import React from "react";
import { connect } from "react-redux";

const Archrive = ({ activitiesNonActive }) => (
  <>
    <h3>Archive</h3>
    <div>
      {activitiesNonActive.map((ac) => (
        <div key={ac.id}>
          {ac.completed ? (
            <div>
              <p>{ac.name} - task accomplised </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  </>
);

//Calling the state from the reducer
const mapStateToProps = ({ activities: { activitiesNonActive } }) => ({
  activitiesNonActive,
});

export default connect(mapStateToProps)(Archrive);
