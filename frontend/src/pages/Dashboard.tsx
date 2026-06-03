import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>
        Welcome {user?.name}
      </h1>
    </div>
  );
};

export default Dashboard;