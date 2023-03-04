import React, { useState, useEffect } from 'react';

function HatForm() {
    const [locations, setLocations] = useState([]);

    const [name, setName] = useState('');
    const [styleName, setStyleName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [fabric, setFabric] = useState('');
    const [color, setColor] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStyleNameChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        const data = {};

        data.name = name;
        data.style_name = styleName;
        data.picture_url = pictureUrl;
        data.fabric = fabric;
        data.color = color;
        data.location = location;

        const hatUrl = 'http://localhost:8090/api/hat/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applications/json',
            }
        };

        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json()
            setName('');
            setStyleName('');
            setPictureUrl('');
            setFabric('');
            setColor('');
            setLocation('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange}
                                placeholder="Name" required type="text"
                                name="name" id="name" className="form-control"
                                value={name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStyleNameChange} placeholder="Style name"
                                required type="text" name="style_name" id="style_name"
                                className="form-control" value={styleName} />
                            <label htmlFor="style_name">Style name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFabricChange} placeholder="Fabric"
                                required type="text" name="fabric" id="fabric" className="form-control" value={fabric} />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} placeholder="Picture Url"
                                required type="text" name="picture_url" id="picture_url"
                                className="form-control" value={pictureUrl} />
                            <label htmlFor="picture_url">Picture url</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} placeholder="Color"
                                required text="text" name="color" id="color" className="form-control" value={color} />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange}
                                required name="location" id="location" className="form-select"
                                value={location}>
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.href} value={location.href}>
                                            {location.closet_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default HatForm;
