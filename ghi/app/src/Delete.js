import React from 'react';

export default function Delete(props) {
    return (
        <button
            onClick={async () => {
                const url = `http://localhost:8090${props.href}`;
                const fetchConfig = {
                    method: "delete",
                    Headers: {
                        "Content-Type": "application/json",
                    }
                };
                const response = await fetch(url, fetchConfig);
                try {
                    if (!response.ok) {
                        throw new Error("Error");
                    }
                    window.location.reload();
                } catch (e) {
                    console.log(e);
                }
            }}
            className="btn btn-primary">Delete</button>
    )
}
