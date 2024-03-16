import { useEffect, useState, useMemo } from "react";
import PeopleList from "./PeopleList";
import { callPeopleApi } from "./api";
import appImage from '../src/assets/search.png'; 
import { FaStar } from "react-icons/fa6";

function App() {
	const [peopleList, setPeopleList] = useState([]);
	const [selectedGender, setSelectedGender] = useState("female");
	const [selectedCountry, setSelectedCountry] = useState("All");
	const [sortByName, setSortByName] = useState("original");
	const [countryList, setCountryList] = useState([]);
	const [savedPeople, setSavedPeople] = useState(() =>
        JSON.parse(localStorage.getItem("people")) || []
	);
	console.log(savedPeople)

	useEffect(() => {
		callPeopleApi((data) => {
			setPeopleList(data.results);
			const allCountriesRepeating = data.results.map((person) => {
				return person.location.country;
			});
			const originalCountriesSet = new Set(allCountriesRepeating);
			console.log(originalCountriesSet);
			const countries = [...originalCountriesSet];
			setCountryList(["All", ...countries]);
		});
	}, []);

	const filteredPeopleList = useMemo(() => {
		console.log(peopleList);
		return peopleList
			.filter((personObject) => {
				if (selectedGender === "any") return true;
				else return personObject.gender === selectedGender;
			})
			.filter((personObject) => {
				if (selectedCountry === "All") return true;
				return selectedCountry === personObject.location.country;
			})
			.sort((personObject1, personObject2) => {
				const comparisonValue = personObject1.name.first.localeCompare(
					personObject2.name.first
				);
				if (sortByName === "asc") return comparisonValue;
				else if (sortByName === "desc") return comparisonValue * -1;
				else return 0;
			});
	}, [peopleList, selectedGender, sortByName, selectedCountry]);

	return (
       <div className="py-16 bg-[#e8e4e4] min-h-screen overflow-hidden">
            <div className="flex justify-center items-center flex-col md:flex-row my-10">
                <h1 className="text-6xl font-semibold text-[#75355e]">PeopleHub</h1>
                <img className='max-w-[80px] mt-5 md:mt-0' src={appImage} alt="logo" />
            </div>
            <div className="flex flex-col md:flex-row justify-center my-10 text-2xl gap-5"> 
                <select
                    value={selectedGender}
                    className="border-2 border-[#cbadc7] rounded-lg p-2 outline-none bg-[#dad7d7] mb-3 md:mb-0"
                    onChange={(e) => {
                        setSelectedGender(e.target.value);
                    }}
                >
                    <option>male</option>
                    <option>female</option>
                    <option>any</option>
                </select>
                <select
                    value={sortByName}
                    className="border-2 border-[#cbadc7] rounded-lg p-2 outline-none bg-[#dad7d7] mb-3 md:mb-0"
                    onChange={(e) => {
                        setSortByName(e.target.value);
                    }}
                >
                    <option value="asc">Ascending name</option>
                    <option value="desc">Descending name</option>
                    <option value="original">Original order</option>
                </select>
                <select
                    value={selectedCountry}
                    className="border-2 border-[#cbadc7] rounded-lg p-2 outline-none bg-[#dad7d7] mb-3 md:mb-0"
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                    }}
                >
                    {countryList.map((country, index) => (
                        <option key={"countryOption-" + index}>{country}</option>
                    ))}
                </select>
            </div>
            {savedPeople.length > 0 && (
                <div className="flex justify-center my-10">
                    <h1 className="flex gap-4 text-3xl font-semibold text-[#a6bc46]">
                        Saved People <span><FaStar/></span>
                    </h1>
                </div>
            )}
            <PeopleList
                people={savedPeople}
                savedPeople={savedPeople} 
                setSavedPeople={setSavedPeople} 
                saveNewPerson={(newPerson) => setSavedPeople((prev) => [...prev, newPerson])}
            />

            <h1 className="text-center text-4xl font-semibold text-[#75355e] mt-10">All people</h1>
            <PeopleList
                people={filteredPeopleList}
                savedPeople={savedPeople} 
                setSavedPeople={setSavedPeople}
                saveNewPerson={(newPerson) => setSavedPeople((prev) => [...prev, newPerson])}
            />
        </div>
    );
}

export default App;