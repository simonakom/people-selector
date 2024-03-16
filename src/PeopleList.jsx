import Person from "./Person";

export default function PeopleList({ people, saveNewPerson, savedPeople, setSavedPeople }) {
    return (
        <div className="person-list">
            {people.map((person, index) => (
           <Person
				person={person}
				key={index}
				saveNewPerson={saveNewPerson}
				savedPeople={savedPeople} 
				setSavedPeople={setSavedPeople} 
			/>
            ))}
        </div>
    );
}