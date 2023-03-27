import React from "react";
import SpeedDialSecondary from "../../components/speed-dial/SpeedDialSecondary";
import TableUsers from "./TableUsers";

const ManageUsers = () => {
  const speedDialData = [
    {
      name: "Create User",
      ref: "createUser",
      icon: "fas fa-user-plus",
      action: "null",
    },
  ];

  function displayPopup() {}

  function onClosePopup() {}

  return (
    <div className="manage-users">
      <SpeedDialSecondary data={speedDialData} onClick={displayPopup} active={null} onClose={onClosePopup} />
      <h1>Manage Users</h1>
      <TableUsers
        tableTitle="Users"
        data={{
          headers: [
            { name: "Email", dataRef: "email", sorting: true },
            { name: "Username", dataRef: "username", sorting: true },
            { name: "First Name", dataRef: "firstName", sorting: true },
            { name: "Last Name", dataRef: "lastName", sorting: true },
            { name: "Role", dataRef: "role", sorting: true },
            { name: "Employee ID", dataRef: "employeeId", sorting: true },
            { name: "Active", dataRef: "active", sorting: false },
          ],
          rows: [
            {
              id: "ADM_JACK_SMITH",
              row: [
                { value: "jack.smith@gmail.com", rowRef: "email" },
                { value: "jacksmith", rowRef: "username" },
                { value: "Jack", rowRef: "firstName" },
                { value: "Smith", rowRef: "lastName" },
                { value: "Admin", rowRef: "role" },
                { value: "ADM_JACK_SMITH", rowRef: "employeeId" },
                { value: "Active", rowRef: "active", color: "green", icon: "far fa-check-circle" },
              ],
            },
            {
              id: "EMP_KARAN_ROY",
              row: [
                { value: "karan.roy@gmail.com", rowRef: "email" },
                { value: "karanroy", rowRef: "username" },
                { value: "Karan", rowRef: "firstName" },
                { value: "Roy", rowRef: "lastName" },
                { value: "User", rowRef: "role" },
                { value: "KARAN_ROY", rowRef: "employeeId" },
                { value: "Active", rowRef: "status", color: "green", icon: "far fa-check-circle" },
              ],
            },
            {
              id: "EMP_LIAM_JOHNSON",
              row: [
                { value: "liam.johnson@gmail.com", rowRef: "email" },
                { value: "liamjohnson", rowRef: "username" },
                { value: "Liam", rowRef: "firstName" },
                { value: "Johnson", rowRef: "lastName" },
                { value: "User", rowRef: "role" },
                { value: "EMP_LIAM_JOHNSON", rowRef: "employeeId" },
                { value: "Disabled", rowRef: "status", color: "red", icon: "far fa-times-circle" },
              ],
            },
            {
              id: "ADM_NOAH_BROWN",
              row: [
                { value: "noah.brown@gmail.com", rowRef: "email" },
                { value: "noahbrown", rowRef: "username" },
                { value: "Noah", rowRef: "firstName" },
                { value: "Brown", rowRef: "lastName" },
                { value: "Admin", rowRef: "role" },
                { value: "ADM_NOAH_BROWN", rowRef: "employeeId" },
                { value: "Active", rowRef: "status", color: "green", icon: "far fa-check-circle" },
              ],
            },
            {
              id: "EMP_ELIJAH_DAVIS",
              row: [
                { value: "elijah.davis@gmail.com", rowRef: "email" },
                { value: "elijahdavis", rowRef: "username" },
                { value: "Elijah", rowRef: "firstName" },
                { value: "Davis", rowRef: "lastName" },
                { value: "User", rowRef: "role" },
                { value: "EMP_ELIJAH_DAVIS", rowRef: "employeeId" },
                { value: "Active", rowRef: "status", color: "green", icon: "far fa-check-circle" },
              ],
            },
            {
              id: "EMP_EMMA_JONES",
              row: [
                { value: "emma.jones.davis@gmail.com", rowRef: "email" },
                { value: "emmajones", rowRef: "username" },
                { value: "Emma", rowRef: "firstName" },
                { value: "Jones", rowRef: "lastName" },
                { value: "User", rowRef: "role" },
                { value: "EMP_EMMA_JONES", rowRef: "employeeId" },
                { value: "Active", rowRef: "status", color: "green", icon: "far fa-check-circle" },
              ],
            },
            {
              id: "EMP_GARCIA_DAVIS",
              row: [
                { value: "garcia.davis@gmail.com", rowRef: "email" },
                { value: "garciadavis", rowRef: "username" },
                { value: "Garcia", rowRef: "firstName" },
                { value: "Davis", rowRef: "lastName" },
                { value: "User", rowRef: "role" },
                { value: "EMP_GARCIA_DAVIS", rowRef: "employeeId" },
                { value: "Active", rowRef: "status", color: "green", icon: "far fa-check-circle" },
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default ManageUsers;
