import React, { Component } from "react";
import FormBoxTour from "./formBoxTour";
import callApi from "../../../common/callAPI";

class BgListTour extends Component {
  constructor() {
    super();
    this.state = {
      tours: []
    };
  }

  // get  data
  componentDidMount() {

    callApi(`tours?style=${this.props.styleTour}&&_limit=3`, "Get", null).then(
      res => {
        this.setState({ tours: res.data });
      }
    );
  }

  render() {
    let datas = this.state.tours;
    return (
      // list tour
      <div className=" container px-0 my-5">
        <div className="d-flex  justify-content-between title-and-seeMove">
          <h5 className="bg-danger p-2 rounded text-white">
            {this.props.titleName}
          </h5>
          <a className="text-right" href="#">
            Xem Thêm ...
          </a>
        </div>
        <div className="mover-list bg-light p-3 rounded d-flex list-all-e-tour">
          {/* display  box  */}
          {datas &&
            datas.map((data, i) => {
              return <FormBoxTour key={"FormBoxTour" + i} data={data} />;
            })}
          {/* end display  box  */}
        </div>
      </div>
      // end list tour
    );
  }
}

export default BgListTour;
