// date fns
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const GoalDetails = ({ goal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGoal = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/goals${goal.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }
      // Handle success
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/api/goals`);
        if (!response.ok) {
          throw new Error("Failed to fetch goal");
        }
        const data = await response.json();
        // Handle data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goal.id]);

  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>
        Created: {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
        <br />
        Due Date: {formatDistanceToNow(new Date(goal.dueDate), { addSuffix: true })}
        <br />
        Priority: {goal.priority}
      </p>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {error ? (
            <span>Error: {error}</span>
          ) : (
            <>
              <button onClick={deleteGoal}>Delete</button>
              {/* Add other API interactions here */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GoalDetails;