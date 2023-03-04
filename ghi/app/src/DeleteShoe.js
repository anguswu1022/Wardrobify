import React from "react";

export default function DeleteShoe(props) {
  return (
    <button
      onClick={async () => {
        const url = `http://localhost:8080${props.href}`;
        const fetchConfig = {
          method: "delete",
          Headers: {
            "Content-Type": "application/json",
          },
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
      className="btn btn-dark btn-sm"
    >
      Delete shoe
    </button>
  );
}
