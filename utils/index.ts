export async function fetchCars() {
    const headers = {
        "X-RapidAPI-Key": "13d54b357cmsh20eb04d6f744a75p1c331djsn5c1be15a2a80",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
    }

    const response = await fetch("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla", { headers: headers });

    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Dolar cinsinden günlük baz kira fiyatı
    const mileageFactor = 0.1; // Kat edilen mil başına ek ücret
    const ageFactor = 0.05; // Araç yaşı başına ek ücret

    // Kilometre ve yaşa göre ek ücret hesapla
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Günlük toplam kiralama ücretini hesaplama
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};