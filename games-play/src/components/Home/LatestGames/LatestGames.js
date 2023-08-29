import { Link } from "react-router-dom"

export const LatestGames = ({
game
}) => {
    
    return (
        <div className="game">
        <div className="image-wrap">
            <img src={game.imageUrl}/>
        </div>
        <div className="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <h3>{game.title}</h3>
        <div className="data-buttons">
            <Link to={`/catalog/${game._id}`} className="btn details-btn">Details</Link>
        </div>
    </div>
    )
}