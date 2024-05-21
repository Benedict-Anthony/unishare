import React, { ReactNode } from "react";
import { materialTypes } from "../../types/material";

type BookType = {
  item: materialTypes;
  children?: ReactNode;
};
const Book = ({ item, children }: BookType) => {
  return (
    <div className="card shadow-lg relative">
      <div className="card-body">
        <div className="w-full">
          <img
            src={item.coverPhoto}
            alt={item.title}
            className="w-full h-40 object-cover"
          />
        </div>
        <h1 className="md:text-2xl font-bold w-full">{item.title}</h1>
      </div>

      {children}
    </div>
  );
};

export default Book;
