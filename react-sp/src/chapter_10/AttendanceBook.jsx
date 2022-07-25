import React from "react";

const students = [
    {
        name: "Minhyuk",
        id: 1,
    },
    {
        name: "Nahyun",
        id: 2,
    },
    {
        name: "Donghun",
        id: 3,
    },
    {
        name: "Paul",
        id: 4,
    },
    {
        name: "Sora",
        id: 5,
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student) => {
                return <li key={student.id}>{student.name}</li>;
            })}
        </ul>
    );
}

export default AttendanceBook;