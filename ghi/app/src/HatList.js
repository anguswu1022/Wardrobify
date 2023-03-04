import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Delete from './Delete';

function HatColumns(props) {
    // const button = document.getElementbyId('btn');
    // button.addEventListner('click', (event) => {
    //     event.target.remove();
    // });

    return (
        <div className="col">
            {props.list.map(hat => {

                return (
                    <div key={hat.href} className="card mb-3 shadow">
                        <img src={hat.picture_url} className="card-img-top" />

                        <div className="card-body">
                            <h5 className="card-title">{hat.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {hat.style_name}
                            </h6>
                            <p className="card-text">
                                {`${hat.fabric} ${hat.color}`}
                            </p>
                        </div>
                        <div className="card-text">
                            {`${hat.location.closet_name} ${hat.location.shelf_name}
                            ${hat.location.shelf_number}`}

                        </div>
                        <div className="card-footer">
                            <div>
                                <Delete href={hat.href} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function HatPage() {
    const [hatColumns, setHatColumns] = useState([[], [], []]);
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/hat/'

        try {
            const response = await fetch(url);
            if (response.ok) {
                // get list of hats
                const data = await response.json();
                //  create a list of for all the requests and add all of the requests to it
                const requests = [];
                for (let hat of data.hats) {
                    // when using "$" make sure to use `` for the quotations (tilde)
                    const detailUrl = `http://localhost:8090${hat.href}`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                // set up the "columns to put the hat information into"
                const columns = [[], [], []];
                // loop over the hat detail response and add each to the proper column
                // if the response is okay
                let i = 0;
                for (const hatResponse of responses) {
                    if (hatResponse.ok) {
                        const details = await hatResponse.json();
                        columns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(hatResponse);
                    }
                }
                // set the hat to the new list of three list of hat
                setHatColumns(columns);
            }

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <h1 className="display-5 fw-bold">Hat</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        The only place where you can find hats, create hats, and delete hats!!
                        I know its great!
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Create a hat</Link>
                    </div>
                </div>
                <div className="container">
                    <h2>Hat List</h2>
                    <div className="row">
                        {hatColumns.map((hatList, index) => {
                            return (
                                <HatColumns key={index} list={hatList} />
                            )
                        })}
                    </div>
                </div>
            </div>


        </>
    )
}
