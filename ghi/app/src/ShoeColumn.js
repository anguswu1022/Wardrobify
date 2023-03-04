import React from "react";
import DeleteShoe from "./DeleteShoe";

export default function ShoeColumn(props) {
  return (
    <div className="col">
      {props.list.map((shoe) => {
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" alt="shoe" />
            <div className="card-body">
              <h5 className="card-title">{shoe.manufacturer}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.model_name}
              </h6>
              <p className="card-text">Color: {shoe.color}</p>
              <div>
                <DeleteShoe href={shoe.href} />
              </div>
            </div>
            <div className="card-footer">
              {`${shoe.bin.closet_name} #${shoe.bin.bin_number}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
