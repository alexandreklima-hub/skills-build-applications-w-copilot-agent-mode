import React, { useEffect, useState } from 'react';

const WORKOUTS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Buscando dados de:', WORKOUTS_API);
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Dados recebidos:', results);
      })
      .catch(err => console.error('Erro ao buscar treinos:', err));
  }, []);

  return (
    <div className="card app-card">
      <div className="card-body">
        <h2 className="card-title app-heading">Treinos</h2>
        <table className="table table-striped app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.id || idx}</td>
                <td>{workout.name || JSON.stringify(workout)}</td>
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

export default Workouts;
