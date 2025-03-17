
/*
created a React component called FeedbackSystem. 
This component will:
-Display five aspects: Readability, Performance, Security, Documentation, and Testing.
-Have Upvote and Downvote buttons for each aspect.
-Maintain state for upvote/downvote counts.
-Update counts immediately when a button is clicked.
*/

import React, { useState } from "react";

const aspects: string[] = ["Readability", "Performance", "Security", "Documentation", "Testing"];

// Define TypeScript types for votes
interface Votes {
  [key: string]: { upvotes: number; downvotes: number };
}

const FeedbackSystem: React.FC = () => {
  const [votes, setVotes] = useState<Votes>(
    aspects.reduce((acc, aspect) => {
      acc[aspect] = { upvotes: 0, downvotes: 0 };
      return acc;
    }, {} as Votes)
  );

  const handleVote = (aspect: string, type: "upvotes" | "downvotes") => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [aspect]: {
        ...prevVotes[aspect],
        [type]: prevVotes[aspect][type] + 1,
      },
    }));
  };

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {aspects.map((item, index) => (
          <div key={item} className="pa-10 w-300 card">
            <h2>{item}</h2>
            <div className="flex my-30 mx-0 justify-content-around">
              <button
                className="py-10 px-15"
                data-testid={`upvote-btn-${index}`}
                onClick={() => handleVote(item, "upvotes")}
              >
                👍 Upvote
              </button>
              <button
                className="py-10 px-15 danger"
                data-testid={`downvote-btn-${index}`}
                onClick={() => handleVote(item, "downvotes")}
              >
                👎 Downvote
              </button>
            </div>
            <p className="my-10 mx-0" data-testid={`upvote-count-${index}`}>
              Upvotes: <strong>{votes[item]?.upvotes ?? 0}</strong>
            </p>
            <p className="my-10 mx-0" data-testid={`downvote-count-${index}`}>
              Downvotes: <strong>{votes[item]?.downvotes ?? 0}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSystem;
