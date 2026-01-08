import React, { useEffect, useState } from 'react';

const TEAMS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Buscando dados de:', TEAMS_API);
    fetch(TEAMS_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Dados recebidos:', results);
      })
      .catch(err => console.error('Erro ao buscar times:', err));
  }, []);

  return (
    <div className="card app-card">
      <div className="card-body">
        <h2 className="card-title app-heading">Times</h2>
        <table className="table table-striped app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Membros</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.id || idx}</td>
                <td>{team.name || JSON.stringify(team)}</td>
                <td>{team.members ? team.members.length : '-'}</td>
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

export default Teams;
