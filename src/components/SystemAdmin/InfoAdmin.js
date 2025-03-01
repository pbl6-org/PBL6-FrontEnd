import axios from "axios";

import { useState, useEffect } from "react";
import { CAlert, CFormSelect } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import CITY from "../vn/CITY.json";
import DISTRICT from "../vn/DISTRICT.json";

export const InfoAdmin = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [profile, setProfile] = useState({});
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState(true);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [workingPosition, setworkingPosition] = useState("System admin");
  const [roleId, setroleId] = useState(1);
  const [visible, setVisible] = useState(false);
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users");
        //console.log({ data });
        setProfile(data.data.user);
        setfirstName(data.data.user.firstName);
        setlastName(data.data.user.lastName);
        setdateOfBirth(data.data.user.dateOfBirth);
        setgender(data.data.user.gender);
        setphone(data.data.user.phone);
        setemail(data.data.user.email);
        setstreet(data.data.user.street);
        setdistrict(data.data.user.district);
        setcity(data.data.user.city);
        setplaceOfBirth(data.data.user.placeOfBirth);
      } catch (e) {}
    })();
  }, []);

  //city,district
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
  //       );
  //       setlistcity(data.data.data);
  //     } catch (e) {}
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://vn-public-apis.fpo.vn/districts/getAll?limit=-1"
  //       );
  //       setlistdistrict(data.data.data);
  //     } catch (e) {}
  //   })();
  // }, []);
  // const setadd = async (code) => {
  //   const c = listcity.find((item) => item.code === code);
  //   setcity(c.name);
  //   const { data } = await axios.get(
  //     `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`
  //   );
  //   setlistdistrict(data.data.data);
  // };

  useEffect(() => {
    (async () => {
      try {
        setlistcity(CITY);
        setlistdistrict(DISTRICT);
      } catch (e) {}
    })();
  }, []);

  const setadd = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcity(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrict(d);
  };

  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put("users", {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
      email,
      street,
      district,
      city,
      placeOfBirth,
      workingPosition,
      roleId,
    });
    if (res.status === 200) {
      setVisible(true);
    } else {
      window.alert("Thất bại.");
    }

    //alert("done.");
    //console.log({ res });
  };

  return (
    <>
      <CAlert
        className="alert"
        color="primary"
        dismissible
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Thành công!
      </CAlert>
      <form onSubmit={save} className="container rounded bg-white mt-0 mb-0">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="font-weight-bold">
                <b>{profile.displayName}</b>
              </span>
              <span className="text-black-50">{email}</span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className=" py-5 ">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-right">Profile Settings</h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <b>Họ</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <b>Tên</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <b>Ngày sinh</b>
                  <input
                    type="date"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <b>Giới tính</b>
                  <CFormSelect
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  <b>Số điện thoại</b>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <b>Nơi sinh</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={placeOfBirth}
                    onChange={(e) => setplaceOfBirth(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <b>Địa chỉ</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={street}
                    onChange={(e) => setstreet(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="col-md-12">
                  <b>District</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={district}
                    onChange={(e) => setdistrict(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <b>City</b>
                  <input
                    type="text"
                    maxlength="100"
                    className="form-control"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    required
                  />
                </div> */}
                <div className="col-md-12">
                  <b>Quậ/Huyện</b>
                  <CFormSelect
                    value={district}
                    onChange={(e) => setdistrict(e.target.value)}
                  >
                    {listdistrict.map((item) => (
                      <option value={item.name} label={item.name}></option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  <b>Tỉnh/Thành phố</b>
                  <CFormSelect
                    value={listcity.find((item) => item.name === city)?.code}
                    onChange={(e) => setadd(e.target.value)}
                  >
                    {listcity.map((item) => (
                      <option value={item.code} label={item.name}></option>
                    ))}
                  </CFormSelect>
                </div>

                <div className="col-md-12">
                  <b>Email</b>
                  <input
                    type="email"
                    maxlength="100"
                    className="form-control"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Lưu thông tin
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience"></div>
              <br />
              <br />

              <div className="col-md-6">
                <b>Role</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={profile.role}
                  readOnly
                />
              </div>
              <br />
              <div className="col-md-6">
                <b>UserName</b>
                <input
                  type="text"
                  maxlength="100"
                  className="form-control"
                  value={profile.username}
                  readOnly
                />
              </div>
            </div>
          </div> */}
        </div>
      </form>
    </>
  );
};
