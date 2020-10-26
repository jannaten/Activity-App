import React from "react";
import "./archrive.styles.scss";
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

const mapStateToProps = (state) => ({
  activitiesNonActive: state.activities.activitiesNonActive,
});

export default connect(mapStateToProps)(Archrive);
