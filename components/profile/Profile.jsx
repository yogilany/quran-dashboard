"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ myProfile, desc, data, handleEdit, handleDelete, user }) => {
  return (
    <section className="w-full text-right items-end justify-end float-right py-12">
     <h1 className="head_text text-right">
        <span className=" text-neutral-200 font-light text-xl font-readex">حسابــــــــــــــــــــــــــــــــــــــي</span>
      </h1>
      <h1 className="head_text text-right">
        <span className="teal_gradient">يوسف جيلاني</span>
      </h1>

    </section>
  );
};

export default Profile;
