import React, { useEffect, useState } from 'react';

const USERS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Buscando dados de:', USERS_API);
    fetch(USERS_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Dados recebidos:', results);
      })
      .catch(err => console.error('Erro ao buscar usuários:', err));
  }, []);

  return (
    <div className="card app-card">
      <div className="card-body">
        <h2 className="card-title app-heading">Usuários</h2>
        <table className="table table-striped app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Username</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.id || idx}</td>
                <td>{user.name || '-'}</td>
                <td>{user.username || '-'}</td>
                <td>
                  <button className="btn btn-primary app-btn">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
