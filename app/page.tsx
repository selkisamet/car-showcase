import { fetchCars } from "@/utils";
import { Hero, SearchBar, CustomFilter, CarCard } from "./components";
import { fuels, yearsOfProduction } from "@/constant";


export default async function Home({ searchParams }) {


  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer,
    model: searchParams.model || 2022,
    year: searchParams.year || "",
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explorer the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {
          !isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars?.map((car, index) => <CarCard key={index} car={car} />)
                }
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Opps, no results.</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }
      </div>
    </main>
  );
}


// Boy: 146
// En: 148

// Boy: 142.5
// En: 122.5