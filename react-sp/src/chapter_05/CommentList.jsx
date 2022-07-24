import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name : "김민혁",
        comment : "안녕하세요, 민혁입니다.",
    },

    {
        name : "권나현",
        comment : "안녕하세요, 나현입니다.",
    }
]



function CommentList(props){
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment= {comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;