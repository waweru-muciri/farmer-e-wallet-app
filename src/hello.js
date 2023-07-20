function doubleRoundRobin(teams) {
    const games = [];

    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            games.push([teams[i], teams[j]]);
        }
    }

    const homeGames = games.slice();
    const awayGames = [];

    for (let i = 0; i < games.length; i++) {
        awayGames.push([games[i][1], games[i][0]]);
    }

    return games.concat(awayGames);
}



const TEAMS = [
    { team: "Cklein Stars", city: "Nairobi", home_stadium: "Cklein Arena" },
    { team: "Wolves FC", city: "Nairobi", home_stadium: "Wolves" },
    { team: "Dolphins FC", city: "Mombasa", home_stadium: "Dolphins" },
    { team: "Sea Horses FC", city: "Mombasa", home_stadium: "Sea Horses Arena" },
    { team: "Sharks United", city: "Kisumu", home_stadium: "Sharks Field" },
    { team: "Lake Basin FC", city: "Kisumu", home_stadium: "LBasin" },
    { team: "Thika United", city: "Kisumu", home_stadium: "Thika Field" },
    { team: "Mavuno Comrades FC", city: "Nakuru", home_stadium: "Yuno Grounds" },
    { team: "Nakuru FC", city: "Nakuru", home_stadium: "Nakuru Field" },
    { team: "Ostrich Associates", city: "Nakuru", home_stadium: "Oassociates" },
]

function doubleRoundRobin(teams) {
    // Create a 2D array to store the games.
    const games = [];
    for (let i = 0; i < teams.length; i++) {
      games[i] = [];
    }
  
    // Iterate through all the teams and schedule their games.
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i != j) {
          games[i].push([teams[i], teams[j]]);
        }
      }
    }
  
    // Reverse the home and away teams for the second phase.
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < games[i].length; j++) {
        const [homeTeam, awayTeam] = games[i][j];
        games[i][j] = [awayTeam, homeTeam];
      }
    }
  
    return games;
  }

  const GAMES = doubleRoundRobin(TEAMS)
  for (let index = 0; index < GAMES.length; index++) {
    const GAME = GAMES[index]
    console.log(GAME)
    
  }