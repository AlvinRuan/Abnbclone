"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div className="text-center px-4 py-2 hover:bg-neutral-100 transition ">
      {label}
    </div>
  );
};

export default MenuItem;
