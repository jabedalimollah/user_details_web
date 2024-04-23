import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css";
import axios from "axios";
import UpdatePage from "../../components/HomeComponent/UpdatePage";

const Home = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();
  const logoutBtn = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const editToggleBtn = () => {
    setEdit(!edit);
  };
  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      // console.log(token);
      const response = await axios.get("http://localhost:5000/person", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setData(response.data);
        // console.log(response.status);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData2 = async () => {
    // const response = await axios.get(`http://localhost:5000/person`);
    // const data2 = await response.json();
    let response = await fetch("http://localhost:5000/person");
    response = await response.json();
    setData(response);
    // console.log(response);
  };

  const handleEditBtn = (item) => {
    setEdit(true);
    setPerson(item);
    // console.log(item);
  };
  const handleDeleteBtn = async (id) => {
    let response = await axios.delete(
      `http://localhost:5000/person/delete/${id}`
    );
    fetchData();
  };
  useEffect(() => {
    fetchData();
    let auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {edit ? (
        <UpdatePage editToggleBtn={editToggleBtn} person={person} />
      ) : (
        <div className={style.main}>
          <div className={style.box}>
            <button className={style.logout_btn} onClick={logoutBtn}>
              Log out
            </button>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr className={style.table_row} key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.age}</td>
                      <td className={style.button_warpper}>
                        <button
                          className={style.edit_btn}
                          onClick={() => handleEditBtn(item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className={style.button_warpper}>
                        <button
                          className={style.delete_btn}
                          onClick={() => handleDeleteBtn(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr className={style.table_row}>
              <td>1</td>
              <td>Jabed Ali Mollah</td>
              <td>jabedalimollah7@gmail.com</td>
              <td>jabedali</td>
              <td>23</td>
              <td className={style.button_warpper}>
                <button className={style.edit_btn}>Edit</button>
              </td>
              <td className={style.button_warpper}>
                <button className={style.delete_btn}>Delete</button>
              </td>
            </tr>
            <tr className={style.table_row}>
              <td>2</td>
              <td>Raj Dev</td>
              <td>rajdev@gmail.com</td>
              <td>rajdev</td>
              <td>22</td>
              <td className={style.button_warpper}>
                <button className={style.edit_btn}>Edit</button>
              </td>
              <td className={style.button_warpper}>
                <button className={style.delete_btn}>Delete</button>
              </td>
            </tr>
            <tr className={style.table_row}>
              <td>3</td>
              <td>Vijay Raj</td>
              <td>vijayraj@gmail.com</td>
              <td>vijayraj</td>
              <td>22</td>
              <td className={style.button_warpper}>
                <button className={style.edit_btn}>Edit</button>
              </td>
              <td className={style.button_warpper}>
                <button className={style.delete_btn}>Delete</button>
              </td>
            </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
