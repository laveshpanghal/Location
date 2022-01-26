import React, { Fragment } from "react";
import Checkbox from "./Checkbox";
import img from './SignupFormImages/waste_space.svg';
const WasteSpace = ({
                        WasteSpace,
                        onChange,
                        onSubmit,
                        checkboxes,
                        showButton = true,
                        showImg = true,
                    }) => {
    let wrapperClass = "form-group";

    return (
        <div className={wrapperClass}>
            <div className="col s12">

                    <div className="wasteSpace-container">
                        {showImg ? (
                            <img
                                className="responsive-img "
                                alt="user image"
                                src={img}
                            />
                        ) : (
                            <Fragment></Fragment>
                        )}
                        {WasteSpace.map((option) => (
                            <Checkbox
                                label={option}
                                isSelected={checkboxes[option]}
                                onCheckboxChange={onChange}
                                key={option}
                                addClass={`checkbox-${option} `}
                            />
                        ))}

                    </div>
                    <br/>
                <div className='flex flex-row justify-end'>
                    <span className="text-green-500 text-xs  italic border-2 px-2 py-1 cursor-pointer  rounded border-indigo-600 hover:bg-indigo-600 hover:text-white " onClick={onSubmit}>Save Choices</span>
                </div>


            </div>

        </div>
    );
};

export default WasteSpace;