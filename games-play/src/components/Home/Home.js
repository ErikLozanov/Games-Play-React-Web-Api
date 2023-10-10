import GameTemplate from "./GameTemplate";

export const Home = ({games}) => {
    games = games.slice(-3);
    console.log(games);
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}
                {games == undefined && (<p className="no-articles">No games yet</p>)}
                {games?.map(x => <GameTemplate key={x._id} {...x}/>)}
                {/* <!-- Display paragraph: If there is no games  --> */}
                
            </div>
        </section>
    );
}