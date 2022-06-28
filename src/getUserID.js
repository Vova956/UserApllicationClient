import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from "react"
import UserCard from "./UserCard"

function GetUserID(props) {
    const [id, setId] = useState(1);
    const [visibleId, setVisibleId] = useState(1)
    const [name, setName] = useState()
    const [photo, setPhoto] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [position, setPosition] = useState()
    const [isRefreshed, setIsRefreshed] = useState(false)

    const ChangeId = (event) => {
        setId(event.target.value)
        setIsRefreshed(false)
    }

    useEffect(() => {
        if (!isRefreshed) {
            console.log("http://localhost:5000/api/v1/users/" + id)
            fetch("http://localhost:5000/api/v1/users/" + id, {
                method: 'GET',
                mode: 'cors',
            }).then((response) => {
                console.log("Responce5 : " + response.status)
                return response.json()
            }).then(data => {
                if(!data.id){
                    return
                }
                console.log("Success5 : " + data.id)

                const user = data;
                setVisibleId(user.id)
                setName(user.name)
                setPhoto(user.photo)
                setPhone(user.phone)
                setEmail(user.email)
                setPosition(user.position)

            }).catch((err) => {
                console.log("Error - " + err.message)
            })
            setIsRefreshed(true)
        }
    }, [isRefreshed])

    return (
        <div>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <TextField id="outlined-basic" label="ID" variant="outlined" sx={{ width: 300 }} onChange={ChangeId} />

                <UserCard
                    id={visibleId}
                    name={name}
                    phone={phone}
                    email={email}
                    position={position}
                    photo={photo}>
                </UserCard>

            </Stack>
        </div>
    )


}

export default GetUserID