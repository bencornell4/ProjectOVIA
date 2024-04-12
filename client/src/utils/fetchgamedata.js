function fetchGameData(username, targetText)
{
    const apiUrl = BASE_URL + `/api/stats/${username}`;
    fetch(apiUrl, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            //data -> stats -> all -> overall -> kd
            targetText.textContent = data.stats.all.overall.kd;
        })
        .catch(error => {
            //can't display stats
            targetText.textContent = "N/A";
        });
}

module.exports = { fetchGameData };