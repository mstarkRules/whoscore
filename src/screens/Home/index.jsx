import React, { useEffect, useState } from "react";

import api from "../../services/api/api";

export default function Home() {
  const [basketData, setBasketData] = useState([]);
  const [footballData, setFootballData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [basketLiveEvents, setBasketLiveEvents] = useState([]);

  function loadEvents() {
    if (basketLiveEvents.length > 0) {
      setInterval(() => {
        loadBasketData();
      }, 10000);
    }
    console.log("eventos ao vivo de basquete: ", basketLiveEvents.length);
  }

  async function loadBasketData() {
    setLoading(true);
    try {
      const { data } = await api.get("basketball/events/live");
      console.log("os dadoss: ", data.events);
      setBasketLiveEvents(data.events);
    } catch (err) {
      console.error("Ocorreu um erro ao carregar dados." + err);
    }
  }

  async function loadFootballData() {
    setLoading(true);
    try {
      const { data } = await api.get("football/events/live");
      console.log("os dados de futebol: ", data.events);
    } catch (err) {
      console.error("Ocorreu um erro ao carregar dados de futebol." + err);
    }
  }

  useEffect(() => {
    loadBasketData();
    loadEvents();
  }, []);

  //console.log("o que tem em basket: ", basketData);
  console.log("o que tem em footbal: ", footballData);
  console.log("o que tem em basket live events: ", basketLiveEvents);
  return (
    <div>
      <h1>Who will score?</h1>
      <div>
        Eventos ao vivo
        <>
          <h2>Eventos de Basket</h2>
          {basketLiveEvents.map((item) => (
            <ul>
              <div>
                <strong>{item.homeTeam.name}</strong> - {item.homeScore.current}
              </div>
              <div>
                <strong>{item.awayTeam.name}</strong> - {item.awayScore.current}
              </div>
            </ul>
          ))}
        </>
      </div>
    </div>
  );
}
