import { LatestGames } from "./LatestGames/LatestGames"

export const Home = ({
games,
}) => {
    return (
        <section id="welcome-world">
  
        <div className="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero"/>

        <div id="home-page">
            <h1>Latest Games</h1>
            <div id="latest-games">
            {games.map(x => <LatestGames key={x._id} game={x}/>)}

            {!games && <p className="no-articles">No games yet</p>}
            </div>
        </div>
    </section>
    )
}