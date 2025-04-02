import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { Comment } from "../@types";

export const CommentsSection = ({ playerId }: { playerId: string }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const commentsRef = collection(db, `comments/${playerId}/comments`);
    const commentsQuery = query(commentsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          author: doc.data().author,
          userId: doc.data().userId,
          date:
            doc.data().timestamp?.toDate().toLocaleDateString() || "Just now",
        }))
      );
    });

    return unsubscribe;
  }, [playerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = commentInput;
    setCommentInput("");

    await addDoc(collection(db, `comments/${playerId}/comments`), {
      text: newComment,
      author: user?.email,
      timestamp: serverTimestamp(),
      userId: user?.uid,
    });
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Comments</h3>

      {comments.map(({ id, author, date, text }) => (
        <div key={id} className="mb-4 pb-4 border-b">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{author}</span>
            <span className="text-gray-500">{date}</span>
          </div>
          <p className="mt-1">{text}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
