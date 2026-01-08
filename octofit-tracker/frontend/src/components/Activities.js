import React, { useEffect, useState } from 'react';

const ACTIVITIES_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Buscando dados de:', ACTIVITIES_API);
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Dados recebidos:', results);
      })
      .catch(err => console.error('Erro ao buscar atividades:', err));
  }, []);

  return (
    <div className="card app-card">
      <div className="card-body">
        <h2 className="card-title app-heading">Atividades</h2>
        <table className="table table-striped app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{activity.id || idx}</td>
                <td>{activity.name || JSON.stringify(activity)}</td>
                <td>
                  <button className="btn btn-primary app-btn">Ver</button>
                  <button className="btn btn-secondary app-btn">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
