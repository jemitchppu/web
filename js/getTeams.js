new gridjs.Grid({
    search: true,
    sort: true,
    pagination: true,
    fixedHeader: true,
    height: "90%",

    columns: [
        {name: "id", width: "200px"},
        {name: "teamname", width: "200px"},
        {name: "teamcity", width: "200px"}
    ],

    server: {
        url: "https://api-16yv.onrender.com/api/v1/teams",
        then: (data) => {
            data.sort((a,b) => b.id - a.id);
            return data.map((teams) => [
                teams.id,
                teams.teamname,
                teams.teamcity
            ]);
        }
    },
}).render(document.getElementById("table"));