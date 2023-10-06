import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getMyGroupAdmin, getMyMembGroups, getMyJEntries } from '../../helpers/userLanding'
import UserTrips from './UserTripDetail'
import UserJEntry from './UserJEntryDetail'

export default function UserLanding () {

    const [tripsMemb, setTripsMemb] = useState([])
    const [tripAdmins, setTripAdmins] = useState([])
    const [journals, setJournals] = useState ([])

    const myId = useSelector((state) => state.auth.user_id)
    const myname = useSelector((state) => state.auth.firstname)

    //get list of trips user is organizing
    useEffect (() => {
        async function getMyGroups (myId) {
            const adminOfGroups = await getMyGroupAdmin(myId)
            console.log("Admin: ", adminOfGroups)
            setTripAdmins(adminOfGroups)
        }
        getMyGroups(myId)
    },[])
    
    // get list of trips user is joining
    useEffect (() => {
        async function getMyGroups (myId) {
            const membOfGroups = await getMyMembGroups(myId)
            console.log("Member of: ", membOfGroups)
            setTripsMemb(membOfGroups)
        }
        getMyGroups(myId)
    },[])

    // get list of journals and save in journals array

    useEffect (() => {
        async function getMyJournals (myId) {
            const journalEntries = await getMyJEntries(myId)
            console.log("Journals: ", journalEntries)
            setJournals(journalEntries)
        }
        getMyJournals(myId)
    },[])

    return(
    <>
    <div className="userlanding">
    <h1>Welcome, {myname}!</h1>
    <h2>Trips</h2>
    <h3>Organizing:</h3>
    {
    tripAdmins.map((group) => {
        return (
        <UserTrips group = {group}/>
        )
    })
    }
    <h3>Joining:</h3>
    {
    tripsMemb.map((group) => {
        return (
        <UserTrips group = {group}/>
        )
    })
    }

    <h2>Journals</h2>
    {
        journals.map((entry) => {
            return (
            <UserJEntry entry = {entry}/>
         )
        })
    }
    </div>
    </>
)}