import { CarProps, FilterProps } from "@/app/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, model, year, fuel, limit } = filters;

    const headers = {
        "X-RapidAPI-Key": "13d54b357cmsh20eb04d6f744a75p1c331djsn5c1be15a2a80",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`, { headers: headers });

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

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}