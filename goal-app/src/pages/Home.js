// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useState, useEffect } from "react";

const Home = () => {
    const  [goals, setGoals] = useState([]);


    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch("http://localhost:3001/api/goals");
            const data = await response.json();
            setGoals(data);
        };
        fetchGoals();
    }
    , []);

    return (
      <div className="home">
          <GoalForm />
          <div className="goals">
              {goals.map((goal) => (
                  <GoalDetails key={goal.id} goal={goal} />
              ))}
          </div>
      </div>
    );
}

export default Home;
