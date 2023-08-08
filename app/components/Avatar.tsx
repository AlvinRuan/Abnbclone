"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      src="/images/human-placeholder.jpg"
      alt="Avatar-Icon"
      height="30"
      width="30"
    />
  );
};

export default Avatar;
