import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  className?: string;
  onClick?: (any: any) => any;
  link?: string;
  disabled?: boolean;
  varient?:
    | "default"
    | "black"
    | "small_accent_light"
    | "small_white"
    | "small_accent"
    | "danger";
  width?: string;
};

export default function CustomButton({
  text,
  className = "",
  onClick,
  link,
  disabled = false,
  varient = "default",
  width = "w-full",
}: Props) {
  const varients: {
    [key: string]: { link: string; button: string; buttonText: string };
  } = {
    default: {
      link: " text-center py-6 px-6 text-lg font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center py-6 px-6 rounded-xl  inline-block  ${
        disabled ? "bg-accent-100" : "bg-accent-500"
      }`,
      buttonText:
        "text-lg text-white uppercase text-center font-Poppins-Medium",
    },
    black: {
      link: " text-center py-6 px-6 text-lg font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center py-6 px-6 rounded-xl  inline-block  ${
        disabled ? "bg-black-200" : "bg-black"
      }`,
      buttonText:
        "text-lg text-white uppercase text-center font-Poppins-Medium",
    },
    danger: {
      link: " text-center py-6 px-6 text-lg font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center py-6 px-6 rounded-xl  inline-block  ${
        disabled ? "bg-danger-100" : "bg-danger"
      }`,
      buttonText:
        "text-lg text-white uppercase text-center font-Poppins-Medium",
    },
    small_accent: {
      link: " text-center px-4 py-3  text-lg font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center px-4 py-3  rounded-xl  inline-block  ${
        disabled ? "bg-accent-100" : "bg-accent-500"
      }`,
      buttonText:
        "text-base text-white uppercase text-center font-Poppins-Medium",
    },
    small_white: {
      link: " text-center px-4 py-3  text-base font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center px-4 py-3  rounded-xl border border-gray-200 inline-block  ${
        disabled ? "bg-white" : "bg-white"
      }`,
      buttonText:
        "text-base text-gray-100 uppercase text-center font-Poppins-Medium",
    },
    small_accent_light: {
      link: " text-center px-4 py-3  text-base font-Poppins-Medium inline-block  uppercase rounded-xl",
      button: ` text-center px-4 py-3  rounded-xl  inline-block  ${
        disabled ? "bg-accent-50" : "bg-accent-50"
      }`,
      buttonText:
        "text-base text-accent-500 uppercase text-center font-Poppins-Medium",
    },
  };

  if (link)
    return (
      <Link
        href={link as any}
        className={`${varients[varient].link} ${className} ${width}`}
      >
        {text}
      </Link>
    );
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      className={` ${varients[varient].button} ${className} ${width}`}
    >
      <Text className={`${varients[varient].buttonText}`}>{text}</Text>
    </TouchableOpacity>
  );
}
