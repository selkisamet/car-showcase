"use client";

import React, { useState } from "react";
import { SearchManufacturer } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src="/magnifying-glass.svg" alt="magnifying glass" height={40} width={40} className="object-contain" />
    </button>
)


const SearchBar = ({ setManufacturer, setModel }) => {
    const [searchManufacturer, setSearchManufacturer] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchManufacturer === "" && searchModel === "") {
            alert("Please fill in all the fields");
        }

        setManufacturer(searchManufacturer);
        setModel(searchModel);
    }

    return (
        <form className="searchbar" id="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer selected={searchManufacturer} setSelected={setSearchManufacturer} />

                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image src="/model-icon.png" alt="car model" height={40} width={40} className="absolute h-[20px] w-[20px] ml-4" />
                <input type="text" name="model" value={searchModel} placeholder="Tiguan" onChange={(e) => setSearchModel(e.target.value)} autoComplete="off" className="searchbar__input" />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar;