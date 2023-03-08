import { useContext, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import axios from 'axios'

//context
import { AuthContext } from "../contexts/authContext";

//components
import PetForm from '../components/PetForm';

const Dashboard = () => {
    const userPetData = useLoaderData()

    const [userPets, setUserPets] = useState(userPetData)

    const [showForm, setShowForm] = useState(false)

    const [showEditForm, setShowEditForm] = useState(false)

    const [changeId, setChangeId] = useState()

    console.log(changeId)

    const { token, userId } = useContext(AuthContext)

    const [petEditName, setPetEditName] = useState()

    const [petEditSpecies, setPetEditSpecies] = useState()

    async function deletePet(petId) {
        // console.log(hasToken)
        try {
            const response = await axios({
                method: 'delete',
                url: `http://localhost:8080/pet/${petId}`,
                headers: {
                    // 'Content-type': "application/json; charset=utf-8",
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response) {
                setUserPets(response.data.petsList)
            }

        } catch (e) {
            console.log(e)
        };
    }


    async function editPet(petId) {
        try {
            const response = await axios({
                method: 'put',
                url: `http://localhost:8080/pet/${petId}`,
                headers: {
                    // 'Content-type': "application/json; charset=utf-8",
                    'Authorization': `Bearer ${token}`,
                }, 
                data: {
                    name: petEditName,
                    species:  petEditSpecies
                }
            })

            if (response) {
                setUserPets(response.data.petsList)
                setChangeId("")
            }

        } catch (e) {
            console.log(e)
        };
    }


    userPets.map(userPet => {
        if (userPet.id === changeId) {
            return <p>This is the edit form</p>
        } else {
            return (
                < div >
                    <div>Name: {userPet.name}</div>
                    <div>Species: {userPet.species}</div>
                    <div>User: {userPet.userId}</div>
                    <button onClick={() => deletePet(userPet.id)}>Delete</button>
                    <button onClick={() => setChangeId(userPet.id)}>Edit</button>
                </div >)
        }
    })


    return (
        <div>
            <div>This is the dashboard. This shows the user's pets. <button onClick={() => setShowForm(!showForm)}>Add pet</button></div>
            <div>
                {/* {userPets.map(userPet => {
                    return (
                        <div>
                            <div>Name: {userPet.name}</div>
                            <div>Species: {userPet.species}</div>
                            <div>User: {userPet.userId}</div>
                            <button onClick={() => deletePet(userPet.id)}>Delete</button>
                            <button onClick={() => setChangeId(userPet.id)}>Edit</button>
                        </div>)
                })} */}
                {userPets.map(userPet => {
                    return (<div>
                        <div>Name: {userPet.name}</div>
                        <div>Species: {userPet.species}</div>
                        <div>User: {userPet.userId}</div>
                        <button onClick={() => deletePet(userPet.id)}>Delete</button>
                    </div>)
                })}
            </div>
            <div> {showForm ? <PetForm userPets={userPets} setUserPets={setUserPets} userId={userId} token={token} showForm={showForm} setShowForm={setShowForm} /> : ""} </div>
        </div>
    )

}

export default Dashboard