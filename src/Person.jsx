import { FaStar } from "react-icons/fa6";

export default function Person({ person, doShowButton = true, saveNewPerson }) {
	function getFullName({ title, first, last }) {
		return `${title} ${first} ${last}`;
	}

	function savePersonToLocalStorage() {
		const currentLocalPeople = JSON.parse(localStorage.getItem("people")) || [];
		currentLocalPeople.push(person);
		const emailsList = [];
		const originalPeople = currentLocalPeople.filter((p) => {
			if (!emailsList.includes(p.email)) {
				emailsList.push(p.email);
				return true;
			} else return false;
		});
		console.log(originalPeople);
		localStorage.setItem("people", JSON.stringify([...originalPeople]));
		saveNewPerson(person);
	}
	return (
		<div className="person text-xl flex flex-col text-[#323131] bg-[#c4b8c44f]"> 
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
        {doShowButton && 
			<button
				className="mx-auto mt-5 outline-none  text-[#8c8e76]  hover:text-[#a6bc46]"
				onClick={savePersonToLocalStorage}>
					<span className="text-5xl"><FaStar/></span>
					<span className="text-2xl">save</span>
			</button>}
    </div>
	);
}



