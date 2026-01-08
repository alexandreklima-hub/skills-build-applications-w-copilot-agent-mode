import React, { useEffect, useState } from 'react';

const LEADERBOARD_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log('Buscando dados de:', LEADERBOARD_API);
    fetch(LEADERBOARD_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Dados recebidos:', results);
      })
      .catch(err => console.error('Erro ao buscar leaderboard:', err));
  }, []);

  return (
    <div className="card app-card">
      <div className="card-body">
        <h2 className="card-title app-heading">Leaderboard</h2>
        <table className="table table-striped app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Pontos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.id || idx}</td>
                <td>{item.name || JSON.stringify(item)}</td>
                <td>{item.points || '-'}</td>
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

export default Leaderboard;
