import React, {useState, useEffect} from 'react';
import UserTasks from './user-tasks';

const SignUpPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      setUsers(users);
    })
  }, [])
  return <div>
    {
      users.map(user => {
        return <UserTasks key={user._id} userName={user.name} userId={user._id} />
      })
    }
  </div>
}

export default SignUpPage;