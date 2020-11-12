import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [values, setValues] = useState({
    userFirstname: "Coder",
    userLastname: "Byte",
    userPhone: "8885559999",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntryToPhoneBook(values);
    setValues({
      userFirstname: "",
      userLastname: "",
      userPhone: "",
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        onChange={handleChange}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        onChange={handleChange}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props) {
  const { users } = props;
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.userPhone}>
              <td>{user.userFirstname}</td>
              <td>{user.userLastname}</td>
              <td>{user.userPhone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [users, setUsers] = useState([]);

  const addEntryToPhoneBook = (user) => {
    setUsers(
      [...users, user].sort((a, b) =>
        a.userLastname.toLowerCase() > b.userLastname.toLowerCase() ? 1 : -1
      )
    );
  };
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
