import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  updateUser,
} from "../slices/userSlice";

import { useState } from "react";

export default function UserList(){

    const users = useSelector(
        state => state.users.users
    );

    const dispatch = useDispatch();

    const [page,setPage] = useState(1);

    const pageSize = 3;

    const start = (page-1)*pageSize;

    const paginatedUsers = users.slice(
        start,
        start+pageSize
    );

    return(

        <>

        {
            paginatedUsers.map(user=>(

                <div key={user.id}>

                    {user.name}

                    <button
                    onClick={()=>
                    dispatch(updateUser({
                        id:user.id,
                        name:user.name+" Updated"
                    }))
                    }>
                        Edit
                    </button>

                    <button
                    onClick={()=>
                    dispatch(deleteUser(user.id))
                    }>
                        Delete
                    </button>

                </div>

            ))
        }

        <br/>

        <button
        disabled={page===1}
        onClick={()=>setPage(page-1)}
        >
            Prev
        </button>

        <span> Page {page} </span>

        <button
        disabled={start+pageSize>=users.length}
        onClick={()=>setPage(page+1)}
        >
            Next
        </button>

        </>

    )

}


// User clicks Add
//         │
//         ▼
// dispatch(addUser())
//         │
//         ▼
// Redux Slice
//         │
//         ▼
// Store Updated
//         │
//         ▼
// useSelector()
//         │
//         ▼
// Component Re-renders

// Centralized state management.
// Avoids prop drilling.
// Predictable state updates.
// Easy debugging with Redux DevTools.

// Why useSelector?

// Reads state from the Redux store.
// Why useDispatch?

// Sends actions to update the store.
// 

// What happens when dispatch() is called?
// Component dispatches an action.
// Reducer processes the action.
// Redux updates the store.
// useSelector detects the state change.
// React re-renders the component.