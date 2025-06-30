// src/components/Profile/Profile.jsx
import React from 'react';
import styles from './Profile.module.scss';
const Profile = ({ users }) => {
  const visibleUsers = users.slice(0, 4);
  const remainingCount = users.length - visibleUsers.length;
  return (
    <div className={styles.profileContainer}>
      {visibleUsers.map((user, index) => (
        <div
          key={index}
          className={styles.profileCircle}
          style={{ zIndex: visibleUsers.length - index }}
          title={user.name}
        >
          {/* {user.name.charAt(0).toUpperCase()} */}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={`${styles.profileCircle} ${styles.countCircle}`}>
          {remainingCount}+
        </div>
      )}
    </div>
  );
};
export default Profile;
