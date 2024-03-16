import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";

export default function Person({ person, doShowButton = true, saveNewPerson, savedPeople, setSavedPeople }) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const isPersonSaved = savedPeople.some((savedPerson) => savedPerson.email === person.email);
        setIsSaved(isPersonSaved);
    }, [person, savedPeople]);

    function getFullName({ title, first, last }) {
        return `${title} ${first} ${last}`;
    }

    function toggleSaveStatus() {
        if (isSaved) {
            removePersonFromLocalStorage();
        } else {
            savePersonToLocalStorage();
        }
    }

    function savePersonToLocalStorage() {
        const updatedPeople = [...savedPeople, person];
        localStorage.setItem("people", JSON.stringify(updatedPeople));
        saveNewPerson(person);
        setIsSaved(true);
    }

    function removePersonFromLocalStorage() {
        const updatedPeople = savedPeople.filter((savedPerson) => savedPerson.email !== person.email);
        localStorage.setItem("people", JSON.stringify(updatedPeople));
        setSavedPeople(updatedPeople);
        setIsSaved(false);
    }

    return (
        <div className="person text-xl flex flex-col text-[#323131] bg-[#c4b8c44f] min-w-[300px]"> 
            <img
                className="min-w-[200px] mx-auto mb-4 rounded-full" 
                src={person.picture.large}
                alt={getFullName(person.name)}
            />
            <p><span className="font-bold">Name:</span> {getFullName(person.name)}</p>
            <p><span className="font-bold">Gender:</span> {person.gender}</p>
            <p><span className="font-bold">E-Mail:</span> {person.email}</p>
            <p><span className="font-bold">Phone number:</span> {person.phone}</p>
            <p><span className="font-bold">Country:</span> {person.location.country}</p>
            {doShowButton && (
                <button
                    className="mx-auto mt-5 outline-none  text-[#8c8e76]  hover:text-[#a6bc46]"
                    onClick={toggleSaveStatus}
                >
                    <span className="text-5xl"><FaStar/></span>
                    <span className="text-2xl">{isSaved ? "unsave" : "save"}</span>
                </button>
            )}
        </div>
    );
}