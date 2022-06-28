import React, { useEffect, useState } from "react"
import UserCard from "./UserCard"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const user_model = [

]

function ViewingForm(props) {
    const [users, setUsers] = useState(user_model)
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(5)
    const [totalPages, setTotalPages] = useState(5)
    const [isRefreshed, setIsRefreshed] = useState(false)
    const [isDone, setisDone] = useState(false)
    

    const handleChange = (event, newValue) => {
        if (!isDone) {
            setisDone(true)
            setCurrentPage(newValue);
            console.log("Current page : " + currentPage);
            setIsRefreshed(false)
        }
    }

    useEffect(() => {
        if (!isRefreshed) {
            console.log('in useEffect with page' + currentPage)
            setIsRefreshed(true)
            setisDone(false)
            console.log("http://localhost:5000/api/v1/users" + "?page=" + currentPage + "&count=" + count)
            fetch("http://localhost:5000/api/v1/users" + "?page=" + currentPage + "&count=" + count, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                console.log("Responce3 : " + response.ok)
                return response.json()
            }).then(data => {
                console.log("Success3 : " + data.success)
                console.log("First id : " + data.users[0].id)
                setTotalPages(data.total_pages)

                setUsers(data.users)

            }).catch((err) => {
                console.log("Error3 - " + err.message)
            })
        }
    }, [isRefreshed])

    useEffect(() => {
        console.log("FUCk")
        fetch("http://localhost:5000/api/v1/users" + "?page=" + currentPage + "&count=" + count, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log("Responce : " + response.ok)
            return response.json()
        }).then(data => {
            console.log("Success3 : " + data.success)

            setTotalPages(data.total_pages)

            setUsers(data.users)

        }).catch((err) => {
            console.log("Error - " + err.message)
        })
    }, [])

    return (
        <div>
            <h2>PAGE : {currentPage}</h2>
            <Grid container spacing={1}>
                {
                    users.map(i => {

                        return <Grid item>
                            <UserCard
                                id={i.id}
                                name={i.name}
                                phone={i.phone}
                                email={i.email}
                                position={i.position}
                                photo={i.photo}>
                            </UserCard>

                        </Grid>
                    })
                }
            </Grid>

            <Box sx={{ mt: 20, width: 300 }}>
                <Slider
                    aria-label="Page"
                    defaultValue={1}
                    value={currentPage}
                    onChange={handleChange}
                    step={1}
                    marks
                    min={1}
                    max={totalPages}
                    valueLabelDisplay="auto"
                />
            </Box>

        </div>
    )


}



export default ViewingForm