import React from "react";
import IteamTime from "./iteam-time";
import { NotificationManager } from "react-notifications";
import { withRouter } from "react-router-dom";
import callApi from "../../../../common/callAPI";

const StoreForTime = (props) => {
  console.log("props.matcher.params.id :>> ", props.match.params.id);
  console.log("props store :>> ", props);
  const { messError } = props;
  const getIndexTime = (index) => {
    if (props.match.path === "/admin/tour-management/edit-tour/:id") {
      callApi(
        `bookings_tour?tourID=${props.match.params.id}&timeChose=${props.dataArrayTime[index]}`,
        "Get",
        null
      ).then((res) => {
        if (res && res.status === 200 && res.data) {
          if (res.data <= 0) return handerDelete(index);
          else
            NotificationManager.error("Bạn Không Thể Xóa Vì Có Người Booking");
        } else NotificationManager.error("Vui Lòng Thử Lại");
      });
    } else handerDelete(index);
  };

  const handerDelete = (index) => {
    let newArrayTime = [...props.dataArrayTime];
    newArrayTime.splice(index, 1);
    props.handerUpdateNewTimeStart(newArrayTime);
  };

  const handerAddtime = (e) => {
    if (e.target.value === "") return;
    const newDate = new Date(e.target.value).getTime();
    if (newDate <= Date.now())
      return NotificationManager.error("không Thể Chọn ngày này");
    if (props.dataArrayTime.indexOf(newDate) === -1) {
      props.handerUpdateNewTimeStart([...props.dataArrayTime, newDate]);
    } else NotificationManager.warning("Ngày Đã Tồn  Tại");
    // props.handerUpdateNewTimeStart(e.target.value);
  };

  return (
    <>
      <div className="form-group col-md-6">
        <label htmlFor="timeStart">Chọn Thời Gian Đi</label>{" "}
        <label style={{ display: "inline" }} className="invalid-feedback">
          {messError["timeStart"]}
        </label>
        {props.dataArrayTime.length > 0 ? (
          <span
            style={{
              height: "unset",
              minHeight: " calc(1.5em + .75rem + 2px)",
            }}
            className="form-control p-0 border-0"
            id="timeStart"
          >
            {props.dataArrayTime.map((e, i) => (
              <IteamTime
                key={"time" + i}
                time={e}
                index={i}
                getIndexTime={getIndexTime}
              />
            ))}
          </span>
        ) : (
          ""
        )}
        <input onChange={handerAddtime} className="form-control" type="date" />
      </div>
    </>
  );
};

export default withRouter(StoreForTime);
