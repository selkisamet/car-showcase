"use client"

import React from "react";
import { CustomButtonProps } from "../types";
import Image from "next/image";

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
    return (
        <button
            type={btnType || "button"}
            disabled={false}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}>
            <span className={`flex-1 ${textStyles}`}>{title}</span>
            {
                rightIcon && <div className="relative h-6 w-6">
                    <Image src={rightIcon} className="object-contain" fill alt="right icon" />
                </div>
            }
        </button>
    )
}

export default CustomButton;