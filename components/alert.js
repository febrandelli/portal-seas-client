import {useEffect, useState} from "react";

export function Alert(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    if(props.show)
        setTimeout(() => {
            props.func()
        }, 6000)

    return (
        show && (
            <div className="flex justify-center items-center">
            <div className="flex items-center justify-center fixed mt-40 md:w-full md:bottom-0 md:right-0 md:m-8 sm:max-w-sm z-40">
                <label className={`bg-red-500 close cursor-pointer flex items-center justify-center w-full p-2 md:h-24 h-18 rounded shadow-lg text-white`}>
                    {props.label}
                    <button
                        className="hidden"
                        onClick={props.func}
                    />
                </label>
            </div>
            </div>
        )
    );
}
