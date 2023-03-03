import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShoeColumn(props) {
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
              <p className="card-text">{shoe.color}</p>
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

export default function ShoeList() {
  const [shoeColumns, setShoeColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/shoes/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of shoes
        const data = await response.json();

        // Create a list for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);

        const columns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to the proper "column" if the response is ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            columns[i].push(details);
            i += 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        setShoeColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <h1 className="col-log-6 mx-auto">Shoes</h1>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">
            Create a new shoe
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {shoeColumns.map((shoeList, i) => {
            return <ShoeColumn key={i} list={shoeList} />;
          })}
        </div>
      </div>
    </>
  );
}
