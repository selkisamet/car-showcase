"use client";

import { fetchCars } from "@/utils";
import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "./components";
import { fuels, yearsOfProduction } from "@/constant";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // Filter states
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");


  // Pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [manufacturer, model, year, fuel, limit]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explorer the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {
          allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars?.map((car, index) => (<CarCard key={index} car={car} />))
                }
              </div>

              {
                loading && (
                  <div className="mt-16 w-full flex-center">
                    <Image src="/loader.gif" alt="loader" className="object-contain" height={150} width={150} />
                  </div>
                )
              }

              <ShowMore pageNumber={limit / 10} isNext={limit > allCars.length} setLimit={setLimit} />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Opps, no results.</h2>
            </div>
          )
        }
      </div>
    </main>
  );
}
