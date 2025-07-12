"use client";
import React, { useState, useEffect } from "react";

interface LocationPickerProps {
    locationData: (selected: string[]) => void;
}

export default function LocationPicker({ locationData }: LocationPickerProps) {
    const location: string[] = [
        "Aceh",
        "Sumatera Utara",
        "Sumatera Barat",
        "Riau",
        "Kepulauan Riau",
        "Jambi",
        "Sumatera Selatan",
        "Bangka Belitung",
        "Bengkulu",
        "Lampung",
        "DKI Jakarta",
        "Jawa Barat",
        "Banten",
        "Jawa Tengah",
        "DI Yogyakarta",
        "Jawa Timur",
        "Bali",
        "Nusa Tenggara Barat",
        "Nusa Tenggara Timur",
        "Kalimantan Barat",
        "Kalimantan Tengah",
        "Kalimantan Selatan",
        "Kalimantan Timur",
        "Kalimantan Utara",
        "Sulawesi Utara",
        "Gorontalo",
        "Sulawesi Tengah",
        "Sulawesi Barat",
        "Sulawesi Selatan",
        "Sulawesi Tenggara",
        "Maluku",
        "Maluku Utara",
        "Papua",
        "Papua Barat",
        "Papua Selatan",
        "Papua Pegunungan",
        "Papua Tengah",
        "Papua Barat Daya"
    ];


    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    useEffect(() => { locationData(selectedLocations) }, [selectedLocations]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSelectedLocations(prev =>
            e.target.checked
                ? [...prev, value]                     // ➕ Tambah ke array jika dicentang
                : prev.filter(item => item !== value) // ➖ Hapus dari array jika di-uncheck
        );
    };


    return (
        <div className="">
            <label className="block mb-2 font-semibold">
                Select Location
            </label>
            <div className="border border-gray-300 rounded-md px-4 py-2 space-y-2 max-h-64 overflow-y-auto">
                {location.map((loc, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={`loc-${i}`}
                            value={loc}
                            checked={selectedLocations.includes(loc)}
                            className="accent-blue-500"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`loc-${i}`} className="text-sm">
                            {loc}
                        </label>
                    </div>
                ))}
            </div>
        </div>

    );
}
