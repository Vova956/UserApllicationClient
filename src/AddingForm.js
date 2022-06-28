
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';


function AddingForm(props) {

    const [position, setPosition] = useState('')
    const [positionID, setPositionID] = useState(1)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [file, setFile] = useState()
    const [positions, setPositions] = useState([])
    const [buttonClicked, setButtonClicked] = useState(0);
    const [errMessage, setErrMessage] = useState('---');

    const changeClicked = () => {
        setButtonClicked(buttonClicked + 1)
    }

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/positions", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log("Responce : " + response.ok)
            return response.json()
        }).then(data => {
            setPositions(data.positions)
        }).catch((err) => {
            console.log("Error - " + err.message)
        })
    }, [])


    const Input = styled('input')({
        display: 'none',
    });

    const handlePositionSelectChange = (event) => {
        setPosition(event.target.value);
        for (let i = 0; i < positions.length; i++) {
            if (position === positions[i].name) {
                setPositionID(positions[i].id)
            }
        }
    };

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    const changePhone = (event) => {
        setPhone(event.target.value)
    }

    const upload = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    }

    useEffect(() => {
        if (buttonClicked >= 1) {

            const formData = new FormData();
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phone", phone.slice(0, 13))
            formData.append("position_id", positionID)
            formData.append("image", file)

            fetch("http://localhost:5000/api/v1/users", {
                method: 'POST',
                mode: 'cors',
                body: formData
            }).then((response) => {
                console.log("Responce2 : " + response.ok)
                return response.json()
            }).then(data => {
                if (data.success == false) {
                    throw new Error("User with such valus already exists")
                }

                if (data.fails) {
                    let buff = ""

                    for (let i = 0; i < data.fails.length; i++) {
                        buff += data.fails[i].msg
                        buff += "\n"
                    }

                    setErrMessage(buff)
                }
                
                else {
                    setErrMessage(data.message + " - ID : " + data.user_id)
                }

            }).catch((err) => {
                setErrMessage("Error!")
                console.log("Error2 - " + err.message)
            })
        }
    }, [buttonClicked])


    const getPos = (position) => {
        try {
            return position.name
        } catch (err) {
            console.log(position)
            return 0;
        }
    }

    return (
        <div>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    sx={{ width: 300 }}
                    onChange={changeName} />

                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: 300 }}
                    onChange={changeEmail} />

                <TextField
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    sx={{ width: 300 }}
                    onChange={changePhone} />



                <FormControl>
                    <InputLabel id="slect_label">Position</InputLabel>
                    <Select
                        labelId="slect_label"
                        id="pos_select"
                        value={position}
                        label="Age"
                        onChange={handlePositionSelectChange}
                        sx={{ width: 300 }}
                    >
                        {
                            positions.map(i => {
                                return <MenuItem value={getPos(i)}>{getPos(i)}</MenuItem>
                            })
                        }

                    </Select>
                </FormControl>

                <label htmlFor="contained-button-file" onChange={upload}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span" sx={{ width: 300 }} >
                        Upload Photo
                    </Button>
                </label>

                <Button variant="contained" color="success" sx={{ width: 300 }}
                    onClick={changeClicked}>Confirm</Button>

                <h2>{errMessage}</h2>
            </Stack>

        </div>
    )


}

export default AddingForm