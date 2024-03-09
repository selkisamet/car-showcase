"use client";

import React, { useEffect, useState } from "react";
import { SearchManufacturer } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src="/magnifying-glass.svg" alt="magnifying glass" height={40} width={40} className="object-contain" />
    </button>
)


const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (manufacturer === "" || model === "") {
            alert("Please fill in all the fields");
        }

        updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase());
    }

    const updateSearchParams = (manufacturer: string, model: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (manufacturer) {
            searchParams.set("manufacturer", manufacturer);
        }
        else {
            searchParams.delete("manufacturer");
        }

        if (model) {
            searchParams.set("model", model);
        }
        else {
            searchParams.delete("model");
        }

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
        // router.push(`${newPathName }#searchbar`);
        router.push(newPathName, { scroll: false });
    }

    return (
        <form className="searchbar" id="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />

                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image src="/model-icon.png" alt="car model" height={40} width={40} className="absolute h-[20px] w-[20px] ml-4" />
                <input type="text" name="model" value={model} placeholder="Tiguan" onChange={(e) => setModel(e.target.value)} autoComplete="off" className="searchbar__input" />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar;