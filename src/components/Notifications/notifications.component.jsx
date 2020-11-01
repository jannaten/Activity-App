import React from "react";
import { connect } from "react-redux";

const Notifications = ({ notifiedItem }) => (
  <>
    <h3>Notifications</h3>
    {notifiedItem.length === 0 ? (
      <p>No notifications at this moment</p>
    ) : (
      notifiedItem.length > -1 &&
      notifiedItem.map((notice) => {
        if (notice !== undefined) {
          return (
            <p key={notice.id}>Your task {notice.name} has started now </p>
          );
        }
        return notice;
      })
    )}
  </>
);

//Calling the state from the reducer
const mapStateToProps = ({ activities: { notifiedItem } }) => ({
  notifiedItem,
});

export default connect(mapStateToProps)(Notifications);
