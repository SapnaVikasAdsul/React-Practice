import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";

export default function UserForm() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleAdd = () => {

        if (!name) return;

        dispatch(addUser({
            id: Date.now(),
            name,
        }));

        setName("");
    };

    return (
        <>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />

            <button onClick={handleAdd}>
                Add
            </button>
        </>
    );
}