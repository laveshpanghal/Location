import React from "react";

const Checkbox = ({
                      label,
                      isSelected,
                      onCheckboxChange,
                      addClass = "",
                      spanClass = "",
                      labelClass = "",
                  }) => (
    <p className={addClass}>
        <label className={`${labelClass} cursor-pointer`}>
            <input
                type="checkbox"
                name={label}
                checked={isSelected}
                onChange={onCheckboxChange}
            />
            <span className={spanClass}>{label}</span>
        </label>
    </p>
);

export default Checkbox;