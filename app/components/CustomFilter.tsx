"use client";

import React, { Fragment, useState } from "react";
import { CustomFilterProps } from "../types";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

const CustomFilter = ({ options, setFilter }: CustomFilterProps) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div className="w-fit">
            <Listbox value={selected} onChange={(e) => {
                setSelected(e);
                setFilter(e.value);
            }}>
                <div className="relative w-fit z-10">
                    <Listbox.Button className="custom-filter__btn">
                        <span className="block truncate">{selected.title}</span>
                        <Image src="/chevron-up-down.svg" className="ml-4 object-contain" alt="chevron up" height={20} width={20} />
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="custom-filter__options">
                            {
                                options.map((option) => (
                                    <Listbox.Option key={option.title} value={option} className={({ active }) => `custom-option relative cursor-pointer select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}>
                                        {({ selected }) => (
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.title}</span>
                                        )}
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default CustomFilter;