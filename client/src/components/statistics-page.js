import React, {useState, useEffect} from 'react';
import UserCharts from './user-charts';

const StatisticsPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      users.sort((user1, user2) => user1.sort - user2.sort);
      setUsers(users);
    })
  }, [])
  return <div>
    {
      users.map(user => {
        return <UserCharts key={user._id} userName={user.name} userId={user._id} />
      })
    }
  </div>
}

export default StatisticsPage;